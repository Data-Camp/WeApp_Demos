function animate($animateCss){
    return {
        enter: (element, doneFn) => {
            return $animateCss(element, {
                from: { 
                    opacity: 0,
                    transform: "translateX(50px)"
                },
                to: { 
                    opacity: 1, 
                    transform: "translateX(0)"
                },
                duration: 0.3
            })
        }
    }
}

animate.$inject = ['$animateCss']

export default animate