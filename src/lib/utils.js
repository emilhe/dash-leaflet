function resolveFunctionalProps(props, functionalProps){
    let nProps = Object.assign({}, props);
    for(let prop of functionalProps){
        nProps[prop] = new Function(
     "return function (...args){return " + nProps[prop] + "(...args)}"
        )();
    }
    return nProps
}

export {
  resolveFunctionalProps
};