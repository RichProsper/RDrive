import classes from './File.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

const FILE_TYPES = {
    WORD_1: 'application/msword',
    WORD_2: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    VIDEO_1: 'video/mp4',
    VIDEO_2: 'video/x-matroska',
    VIDEO_3: 'video/webm',
    VIDEO_4: 'video/quicktime',
    VIDEO_5: 'video/x-ms-wmv',
    POWERPOINT_1: 'application/vnd.ms-powerpoint',
    POWERPOINT_2: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    POWERPOINT_3: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PDF: 'application/pdf',
    IMAGE_1: 'image/jpeg',
    IMAGE_2: 'image/png',
    IMAGE_3: 'image/webp',
    EXCEL_1: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    EXCEL_2: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    EXCEL_3: 'application/vnd.ms-excel.sheet.macroEnabled.12',
    EXCEL_4: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // CODE
    // AUDIO
    // ARCHIVE
    // CSV
    TEXT_PLAIN: 'text/plain'
}

export default function File({ file }) {
    const [fileIcon, setFileIcon] = useState(null)
    const dArr = file.modifiedAt ? new Date(file.modifiedAt.toDate()).toDateString().split(' ') : null
    const d = dArr ? dArr[2] + ' ' + dArr[1] + ' ' + dArr[3] : ''
    console.log(file.type)

    const formatSize = size => {
        if (!size) return ''
        if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`
        if (size >= 100 * 1024) return `${(size / 1024).toFixed(0)} KB`
        if (size >= 10 * 1024) return `${(size / 1024).toFixed(1)} KB`
        if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`
        return `${size} bytes`
    }

    useEffect(() => {
        switch (file.type) {
            case FILE_TYPES.WORD_1 :
            case FILE_TYPES.WORD_2 :
                (async () => {
                    const { faFileWord } = await import('@fortawesome/free-solid-svg-icons')
                    return faFileWord
                })().then(icon => setFileIcon(icon))

               return

            case FILE_TYPES.VIDEO_1 :
            case FILE_TYPES.VIDEO_2 :
            case FILE_TYPES.VIDEO_3 :
            case FILE_TYPES.VIDEO_4 :
            case FILE_TYPES.VIDEO_5 :
                (async () => {
                    const { faFileVideo } = await import('@fortawesome/free-solid-svg-icons')
                    return faFileVideo
                })().then(icon => setFileIcon(icon))

               return

            case FILE_TYPES.POWERPOINT_1 :
            case FILE_TYPES.POWERPOINT_2 :
            case FILE_TYPES.POWERPOINT_3 :
                (async () => {
                    const { faFilePowerpoint } = await import('@fortawesome/free-solid-svg-icons')
                    return faFilePowerpoint
                })().then(icon => setFileIcon(icon))

               return

            case FILE_TYPES.PDF :
                (async () => {
                    const { faFilePdf } = await import('@fortawesome/free-solid-svg-icons')
                    return faFilePdf
                })().then(icon => setFileIcon(icon))

               return

            case FILE_TYPES.IMAGE_1 :
            case FILE_TYPES.IMAGE_2 :
            case FILE_TYPES.IMAGE_3 :
                (async () => {
                    const { faFileImage } = await import('@fortawesome/free-solid-svg-icons')
                    return faFileImage
                })().then(icon => setFileIcon(icon))

                return

            case FILE_TYPES.EXCEL_1 :
            case FILE_TYPES.EXCEL_2 :
            case FILE_TYPES.EXCEL_3 :
            case FILE_TYPES.EXCEL_4 :
                (async () => {
                    const { faFileExcel } = await import('@fortawesome/free-solid-svg-icons')
                    return faFileExcel
                })().then(icon => setFileIcon(icon))

                return

            case FILE_TYPES.TEXT_PLAIN :
                (async () => {
                    const { faFileAlt } = await import('@fortawesome/free-solid-svg-icons')
                    return faFileAlt
                })().then(icon => setFileIcon(icon))

               return

            default :
                (async () => {
                    const { faFile } = await import('@fortawesome/free-solid-svg-icons')
                    return faFile
                })().then(icon => setFileIcon(icon))

                return
        }
    }, [file.type])

    return (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.File}
        >
            <span className={classes['w-60']}>
                {fileIcon && <FontAwesomeIcon icon={fileIcon} />} {file.name}
            </span>
            <span className={classes['w-20']}>{d}</span>
            <span className={classes['w-20']}>{formatSize(file.size)}</span>
        </a>
    )
}
