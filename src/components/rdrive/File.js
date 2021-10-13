import classes from './File.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

const FILE_TYPES = {
    VIDEO: 'video',
    IMAGE: 'image',
    AUDIO: 'audio',
    TEXT: 'text',
    TEXT_TYPES: {
        PLAIN: 'plain',
        CODE_1: 'html',
        CODE_2: 'css',
        CODE_3: 'javascript',
    },
    APPLICATION: 'application',
    APPLICATION_TYPES: {
        WORD_1: 'msword',
        WORD_2: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
        POWERPOINT_1: 'vnd.ms-powerpoint',
        POWERPOINT_2: 'vnd.ms-powerpoint.presentation.macroEnabled.12',
        POWERPOINT_3: 'vnd.openxmlformats-officedocument.presentationml.presentation',
        PDF: 'pdf',
        EXCEL_1: 'vnd.ms-excel.sheet.binary.macroEnabled.12',
        EXCEL_2: 'vnd.openxmlformats-officedocument.spreadsheetml.template',
        EXCEL_3: 'vnd.ms-excel.sheet.macroEnabled.12',
        EXCEL_4: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ARCHIVE_1: 'x-gzip',
        ARCHIVE_2: 'x-tar',
        ARCHIVE_3: 'x-zip-compressed',
        CSV: 'vnd.ms-excel'
    }
}

const FILE_COLORS = {
    VIDEO: { color: '#2478ff' },
    IMAGE: { color: '#0a68ff' },
    AUDIO: { color: '#c478ff' },
    TEXT: {color: 'b3b3b3' },
    CODE: { color: '#ff5757' },
    WORD: { color: '#5797ff' },
    POWERPOINT: { color: '#ff795e' },
    PDF: { color: '#ff6363' },
    EXCEL: { color: '#63ff9f' },
    ARCHIVE: { color: '#ffe563' },
    CSV: { color: '#94ffbd' },
    DEFAULT: { color: '#e6e6e6' }
}

export default function File({ file }) {
    const [fileIcon, setFileIcon] = useState(null)
    const [fileColor, setFileColor] = useState(null)
    const dArr = file.modifiedAt ? new Date(file.modifiedAt.toDate()).toDateString().split(' ') : null
    const d = dArr ? dArr[2] + ' ' + dArr[1] + ' ' + dArr[3] : ''

    const formatSize = size => {
        if (size === null || size === undefined) return ''
        if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`
        if (size >= 100 * 1024) return `${(size / 1024).toFixed(0)} KB`
        if (size >= 10 * 1024) return `${(size / 1024).toFixed(1)} KB`
        if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`
        if (size !== 1) return `${size} bytes`
        return `${size} byte`
    }

    useEffect(() => {
        const type = file.type.split("/")

        switch (type[0]) {
            case FILE_TYPES.VIDEO :
                (async () => {
                    const { faFileVideo } = await import('@fortawesome/free-regular-svg-icons')
                    return faFileVideo
                })().then(icon => setFileIcon(icon))

                setFileColor(FILE_COLORS.VIDEO)
               return

            case FILE_TYPES.IMAGE :
                (async () => {
                    const { faFileImage } = await import('@fortawesome/free-regular-svg-icons')
                    return faFileImage
                })().then(icon => setFileIcon(icon))

                setFileColor(FILE_COLORS.IMAGE)
                return

            case FILE_TYPES.AUDIO :
                (async () => {
                    const { faFileAudio } = await import('@fortawesome/free-regular-svg-icons')
                    return faFileAudio
                })().then(icon => setFileIcon(icon))

                setFileColor(FILE_COLORS.AUDIO)
                return

            
            // Text Types
            case FILE_TYPES.TEXT :
                switch (type[1]) {
                    case FILE_TYPES.TEXT_TYPES.PLAIN :
                        (async () => {
                            const { faFileAlt } = await import('@fortawesome/free-regular-svg-icons')
                            return faFileAlt
                        })().then(icon => setFileIcon(icon))
        
                        setFileColor(FILE_COLORS.TEXT)
                       return

                    case FILE_TYPES.TEXT_TYPES.CODE_1 :
                    case FILE_TYPES.TEXT_TYPES.CODE_2 :
                    case FILE_TYPES.TEXT_TYPES.CODE_3 :
                        (async () => {
                            const { faFileCode } = await import('@fortawesome/free-regular-svg-icons')
                            return faFileCode
                        })().then(icon => setFileIcon(icon))
        
                        setFileColor(FILE_COLORS.CODE)
                       return

                    default :
                }

                break

            
            // Application Types
            case FILE_TYPES.APPLICATION :
                switch (type[1]) {
                    case FILE_TYPES.APPLICATION_TYPES.WORD_1 :
                    case FILE_TYPES.APPLICATION_TYPES.WORD_2 :
                        (async () => {
                            const { faFileWord } = await import('@fortawesome/free-regular-svg-icons')
                            return faFileWord
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.WORD)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_1 :
                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_2 :
                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_3 :
                        (async () => {
                            const { faFilePowerpoint } = await import('@fortawesome/free-regular-svg-icons')
                            return faFilePowerpoint
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.POWERPOINT)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.PDF :
                        (async () => {
                            const { faFilePdf } = await import('@fortawesome/free-regular-svg-icons')
                            return faFilePdf
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.PDF)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_1 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_2 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_3 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_4 :
                        (async () => {
                            const { faFileExcel } = await import('@fortawesome/free-regular-svg-icons')
                            return faFileExcel
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.EXCEL)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_1 :
                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_2 :
                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_3 :
                        (async () => {
                            const { faFileArchive } = await import('@fortawesome/free-regular-svg-icons')
                            return faFileArchive
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.ARCHIVE)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.CSV :
                        (async () => {
                            const { faFileCsv } = await import('@fortawesome/free-solid-svg-icons')
                            return faFileCsv
                        })().then(icon => setFileIcon(icon))

                        setFileColor(FILE_COLORS.CSV)
                        return

                    default :
                }
                
                break
                // End of case FILE_TYPES.APPLICATION
    

            default :
                (async () => {
                    const { faFile } = await import('@fortawesome/free-solid-svg-icons')
                    return faFile
                })().then(icon => setFileIcon(icon))

                setFileColor(FILE_COLORS.DEFAULT)
                return
        }
    }, [file.type])

    return (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.File}
            data-ctx-menu-opener
            data-type="file"
            data-id={file.id}
        >
            <span className={classes['w-60']}>
                {fileIcon && <FontAwesomeIcon icon={fileIcon} style={fileColor} />} {file.name}
            </span>
            <span className={classes['w-20']}>{d}</span>
            <span className={classes['w-20']}>{formatSize(file.size)}</span>
        </a>
    )
}
