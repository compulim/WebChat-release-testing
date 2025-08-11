function interceptObservable(observable, middleware) {
  return new Observable(observer => {
    const initializedMiddleware = middleware(observer);
    const subscription = observable.subscribe({
      close() {
        observer.close();
      },
      error(err) {
        observer.error(err);
      },
      next(value) {
        initializedMiddleware(value => observer.next(value))(value);
      }
    });

    return () => subscription.unsubscribe();
  });
}

async function directLineWithMiddleware(directLine, activityMiddleware, connectionStatusMiddleware, postActivityMiddleware) {
  await loadScript('https://unpkg.com/core-js@2/client/core.min.js');

  postActivityMiddleware = postActivityMiddleware && postActivityMiddleware();

  return {
    ...directLine,
    activity$: activityMiddleware
      ? share(interceptObservable(directLine.activity$, activityMiddleware))
      : directLine.activity$,
    connectionStatus$: connectionStatusMiddleware
      ? share(interceptObservable(directLine.connectionStatus$, connectionStatusMiddleware))
      : directLine.connectionStatus$,
    postActivity: postActivityMiddleware
      ? activity => {
          postActivityMiddleware(activity => directLine.postActivity(activity))(activity);
        }
      : directLine.postActivity.bind(directLine)
  };
}

function share(observable) {
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

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    script.setAttribute('src', src);

    document.head.appendChild(script);
  });
}

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  patchProps: async props => {
    const directLine = await directLineWithMiddleware(props.directLine, () => next => activity => {
      if (!~(activity.text || '').indexOf('send failed')) {
        return next(activity);
      }
    });

    return {
      ...props,
      activityStatusMiddleware: () => next => args => {
        const { sendState } = args;

        if (sendState === 'sending') {
          return 'Custom: Sending\u2026';
        } else if (sendState === 'send failed') {
          return 'Custom: Send failed.';
        }

        return next(args);
      },
      directLine,
      styleOptions: {
        sendTimeout: 2000
      }
    };
  }
};
