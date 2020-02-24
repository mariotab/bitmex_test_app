export function setSymbol (state, data) {
  state.selectedSymbol = data
} // <--- we are use this methods when we select some symbol, after we use this simbol in history trader component

export function setSymbols (state, data) {
  state.symbols = data
} // <--- we are use this methods when we get all symbols needed ActiveInstrument component

export function setLoadingSymbols (state, data) {
  state.loadigSymbols = data
}

export function setErrorLoadingSymbols (state, data) {
  state.errorSymbols = data
}
