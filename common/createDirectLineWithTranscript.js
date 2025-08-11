function removeInline(array, searchElement) {
  const index = array.indexOf(searchElement);

  ~index && array.splice(index, 1);
}

function createDeferredObservable(subscribe) {
  const observers = [];
  const observable = new Observable(observer => {
    const unsubscribe = subscribe && subscribe(observer);

    observers.push(observer);

    return () => {
      removeInline(observers, observer);

      unsubscribe && unsubscribe();
    };
  });

  return {
    complete: () => observers.forEach(observer => observer.complete()),
    error: error => observers.forEach(observer => observer.error(error)),
    next: value => observers.forEach(observer => observer.next(value)),
    observable
  };
}

function shareObservable(observable) {
  const observers = [];
  let subscription;

  return new Observable(observer => {
    observers.push(observer);

    if (!subscription) {
      subscription = observable.subscribe({
        complete: () => observers.forEach(observer => observer.complete()),
        error: err => observers.forEach(observer => observer.error(err)),
        next: value => observers.forEach(observer => observer.next(value))
      });
    }

    return () => {
      const index = observers.indexOf(observer);

      ~index && observers.splice(index, 1);

      if (!observers.length) {
        subscription.unsubscribe();
        subscription = null;
      }
    };
  });
}

function updateRelativeTimestamp(now, activity) {
  return {
    ...activity,

    ...(activity.from.role === 'user' &&
    activity.channelData &&
    typeof activity.channelData.clientTimestamp === 'number'
      ? {
          channelData: {
            ...activity.channelData,
            clientTimestamp: new Date(now + (activity.channelData.clientTimestamp || 0)).toISOString()
          }
        }
      : {}),

    ...(typeof activity.timestamp === 'number'
      ? { timestamp: new Date(now + (activity.timestamp || 0)).toISOString() }
      : {})
  };
}

window.createDirectLineWithTranscript = function (activitiesOrFilename, { overridePostActivity } = {}) {
  const now = Date.now();
  const patchActivity = updateRelativeTimestamp.bind(null, now);
  const connectionStatusDeferredObservable = createDeferredObservable(() => {
    connectionStatusDeferredObservable.next(0);
  });

  const activityDeferredObservable = createDeferredObservable(() => {
    (async function () {
      connectionStatusDeferredObservable.next(1);
      connectionStatusDeferredObservable.next(2);

      const activities = (Array.isArray(activitiesOrFilename)
        ? activitiesOrFilename
        : await loadTranscriptAsset(activitiesOrFilename)
      ).map(patchActivity);

      setTimeout(() => {
        activities.forEach(activity => activityDeferredObservable.next(activity));
      }, 100);
    })();
  });

  return {
    activity$: shareObservable(activityDeferredObservable.observable),
    activityDeferredObservable: {
      ...activityDeferredObservable,

      next(activity) {
        return activityDeferredObservable.next(patchActivity(activity));
      }
    },
    connectionStatus$: shareObservable(connectionStatusDeferredObservable.observable),
    connectionStatusDeferredObservable,
    end: () => {},
    postActivity: activity => {
      if (overridePostActivity) {
        return overridePostActivity(activity);
      }

      const id = Math.random().toString(36).substr(2, 5);

      activityDeferredObservable.next(
        patchActivity({
          ...activity,
          id
        })
      );

      return Observable.from([id]);
    }
  };
};
