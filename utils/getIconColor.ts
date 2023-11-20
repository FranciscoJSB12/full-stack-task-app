import iconStyles from "@/styles/Icons.module.scss";

export const getIconColor = (state : boolean):string => {
    if (!!state) {
        return  iconStyles.checkIconDone;
    }
    return iconStyles.checkIcon;
}