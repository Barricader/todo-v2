class StateLoader {
  constructor(initialState) {
    this.initialState = initialState;
  }

  loadState() {
    try {
      const serializedState = localStorage.getItem('taskManager:state');

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('taskManager:state', serializedState);
    } catch (err) {
      console.log(`Save state error: ${err}`); // eslint-disable-line
    }
  }

  initializeState() {
    return this.initialState;
  }
}

export default StateLoader;
