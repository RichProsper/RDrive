import classes from './Heading.module.css'

export default function Heading() {
    return (
        <div className={classes.Heading}>
            <span className={classes['w-60']}>Name</span>
            <span className={classes['w-20']}>Last Modified</span>
            <span className={classes['w-20']}>File Size</span>
        </div>
    )
}
