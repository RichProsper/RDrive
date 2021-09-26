import classes from './Toast.module.css'

export default function Toast({ fileName, progress }) {
    const width = { width: `${progress}%` }

    return (
        <div className={classes.Toast}>
            <header className={classes.header}>{fileName}</header>

            <div className={classes.body}>
                <div className={classes['progress-bar']}>
                    <div className={classes.progress} style={width}></div>

                    <span className={classes.percentage}>
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    )
}
