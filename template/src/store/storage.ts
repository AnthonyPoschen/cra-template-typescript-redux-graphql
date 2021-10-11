export function saveState(state: {sessionState:Object,localState:Object}) {
    try {
      const serialStateSession = JSON.stringify(state.sessionState);
      const serialStateLocal = JSON.stringify(state.localState);
      localStorage.setItem('state', serialStateLocal);
      sessionStorage.setItem('state',serialStateSession);
    } catch(err) {
        console.log(err);
    }
};
export function loadState():Object {
    try {
      var serialStateLocal = localStorage.getItem('state') ?? "{}"
      var localState: Object = JSON.parse(serialStateLocal)
      var serialStateSession = sessionStorage.getItem('state') ?? "{}"
      var sessionState: Object = JSON.parse(serialStateSession)
      return  {...localState,...sessionState};
    } catch (err) {
      console.log(err)
      return {};
    }
};
