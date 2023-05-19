
export const colors = {
    primaryBGColor: 0x0A113A,
    secondaryBGColor: 0x171E54,
    tertiaryBGColor: 0x336699,
    altBtnColor: 0x4CAF50,
}

export const buttonStyles = (containerWidth = null, containerHeight = null) => {
    return {
        width: containerWidth ? 35 * containerWidth / 100 : 250,
        height: containerHeight ? 13 * containerHeight / 100 : 50,
        color: 0xFFFFFF,
        fontSize: containerHeight ? 5 * containerHeight / 100 : 18,
        bgColor: colors.secondaryBGColor,
        margin: containerHeight ? 18 * containerHeight / 100 : 20
    }
}

export const cardStyles = (containerWidth = null, containerHeight = null) => {
    return {
        width: containerWidth ? 40 * containerWidth / 100 : 300,
        height: containerHeight ? 15 * containerHeight / 100 : 50,
        fill: 0xFFFFFF,
        fontSize: containerHeight ? 5 * containerHeight / 100 : 18,
        bgColor: colors.tertiaryBGColor,
    }
}