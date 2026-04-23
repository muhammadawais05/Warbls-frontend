import * as React from "react"
import { Button, makeStyles } from "@material-ui/core"
import clsx from "clsx"

export const AppButton = React.forwardRef((props, ref) => {
    const { root } = useStyles()
    const { label, classes } = props
   
    return ( <Button {...props }
        ref = { ref }
        className = { clsx(root, classes) } > { label } </Button>
    )
})

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: 30,
        textTransform: "none",
        paddingLeft: 20,
        paddingRight: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 18
    }
}))
