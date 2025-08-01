const parts = document.location.search.replace(/^\?/, '').split('&');
const search = parts.reduce((search, part) => {
  const [key, value] = part.split('=');

  search[key] = value;

  return search;
}, {});

function randomID() {
  return Math.random().toString(36).substr(2);
}

const RANDOM_STRINGS = [
  'Magna enim incididunt eiusmod velit id. Elit id magna sunt quis mollit quis id veniam do esse mollit. Qui dolore ullamco eiusmod labore aliquip qui. Aute commodo dolore fugiat adipisicing reprehenderit culpa eiusmod officia dolor. Ea reprehenderit laboris elit commodo eiusmod irure esse velit et.',
  'Esse aute qui sunt nulla fugiat deserunt cupidatat ipsum est cupidatat. Id aliquip adipisicing aliqua ex cupidatat. Officia Lorem excepteur amet nulla irure ullamco Lorem dolore ad. Ut enim ex aliqua excepteur ullamco consequat est proident proident. Sit elit veniam proident sit ullamco laboris sit dolore. Quis do laborum deserunt occaecat dolor nostrud labore ullamco.',
  'Nostrud elit irure Lorem esse dolor duis id. Consectetur elit consectetur eu aliqua deserunt. Incididunt adipisicing labore consequat fugiat proident eiusmod aliqua est occaecat dolor.',
  'Sint est ex eiusmod eiusmod proident quis. Et aliquip tempor pariatur nulla reprehenderit magna commodo nostrud commodo qui officia do sint dolore. Nulla laborum culpa voluptate dolor. Nulla consequat excepteur aute Lorem nostrud pariatur id non aliquip qui ullamco occaecat labore. Lorem tempor nulla mollit mollit. Dolore laboris pariatur officia non voluptate dolore sunt exercitation ex.',
  'Tempor occaecat tempor sit fugiat officia laboris et id est culpa enim quis esse. Lorem aute duis eiusmod cupidatat mollit officia non Lorem anim occaecat sit irure magna aute. Magna cupidatat aute reprehenderit non excepteur enim sint magna incididunt culpa laborum incididunt dolore. Commodo quis eu eiusmod anim nisi eu laboris cupidatat dolore Lorem minim. Dolore enim amet qui amet tempor elit aute sunt cillum do. Deserunt aliquip ex tempor amet cillum labore voluptate nulla. Reprehenderit qui do nostrud et sint amet sint ipsum veniam cupidatat culpa aliquip magna.',
  'Commodo tempor nisi laboris aliqua est elit. Voluptate non in incididunt esse ex laboris. Proident sint velit amet dolor. Elit aute ullamco nostrud tempor qui ea consectetur anim duis id tempor. Nisi minim quis deserunt nostrud labore commodo duis. Commodo nulla occaecat elit laboris mollit labore proident exercitation labore et dolore deserunt. Aute tempor ipsum laboris ullamco fugiat pariatur non ipsum voluptate est.',
  'Eu tempor laboris quis ea in voluptate ad sint proident est sit. Amet deserunt culpa reprehenderit dolore eu veniam aliquip laborum sit. Ex esse consequat consequat eu cupidatat occaecat. Amet non sunt ea magna enim enim in ea consequat amet qui. Sint aute nulla pariatur sit ullamco excepteur amet qui nulla. Exercitation consectetur velit eu consequat id laborum reprehenderit eiusmod ex pariatur exercitation fugiat. Consequat magna voluptate eiusmod labore id exercitation.',
  'Nostrud nulla incididunt nulla duis dolore eiusmod duis officia laborum duis eiusmod. Aute laboris officia in nostrud. Eu deserunt ullamco consectetur mollit anim dolor in. In eu qui non laboris do consequat deserunt aliqua ea. Incididunt labore sint mollit id dolore nostrud voluptate. Magna aute mollit nisi consectetur velit amet duis laboris irure aute esse aliquip. Cupidatat sunt dolore aliqua adipisicing do consequat officia quis duis.',
  'Nulla laborum officia sint tempor tempor. Veniam qui deserunt magna commodo laborum dolore elit officia eu magna. Id elit magna eu eu. Consequat dolor veniam eu eiusmod labore officia aliqua ullamco. Non aliqua culpa sit amet laborum qui id veniam culpa nulla anim nostrud esse ut.',
  'Magna proident tempor occaecat laboris ut enim. Fugiat est sunt eu ut exercitation culpa cupidatat. Mollit enim nostrud consequat sint id dolore irure adipisicing culpa est dolor deserunt.'
];

const directLine = window.createDirectLineWithTranscript(
  RANDOM_STRINGS.map(text => ({
    from: {
      role: 'bot'
    },
    id: randomID(),
    text,
    type: 'message'
  }))
);

window.WebChatReleaseTesting.customizations = {
  ...window.WebChatReleaseTesting.customizations,
  createDirectLineMiddleware: () => () => () => directLine,
  patchProps: props => ({
    ...props,
    styleOptions: {
      ...props.styleOptions,
      ...(search.mode === 'page'
        ? {
            autoScrollSnapOnPage: true,
            autoScrollSnapOnPageOffset: -30
          }
        : {
            autoScrollSnapOnActivity: true,
            autoScrollSnapOnActivityOffset: 30
          })
    }
  })
};

setTimeout(() => {
  document.getElementById('add-bot-message').addEventListener('click', () => {
    directLine.activityDeferredObservable.next({
      from: {
        role: 'bot'
      },
      id: randomID(),
      text: RANDOM_STRINGS[~~(Math.random() * RANDOM_STRINGS.length)],
      type: 'message'
    });
  });
}, 1000);
