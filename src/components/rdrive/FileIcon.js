import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useCallback } from 'react'

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

export default function FileIcon({ fileType }) {
    const [fileIcon, setFileIcon] = useState(null)
    const [fileColor, setFileColor] = useState(null)

    const setDefault = useCallback(() => {
        import('@fortawesome/free-solid-svg-icons')
            .then(({ faFile }) => setFileIcon(faFile))
        setFileColor(FILE_COLORS.DEFAULT)
    }, [])

    useEffect(() => {
        const type = fileType.split("/")

        switch (type[0]) {
            case FILE_TYPES.VIDEO :
                import('@fortawesome/free-regular-svg-icons')
                    .then(({ faFileVideo }) => setFileIcon(faFileVideo))
                setFileColor(FILE_COLORS.VIDEO)
                return

            case FILE_TYPES.IMAGE :
                import('@fortawesome/free-regular-svg-icons')
                    .then(({ faFileImage }) => setFileIcon(faFileImage))
                setFileColor(FILE_COLORS.IMAGE)
                return

            case FILE_TYPES.AUDIO :
                import('@fortawesome/free-regular-svg-icons')
                    .then(({ faFileAudio }) => setFileIcon(faFileAudio))
                setFileColor(FILE_COLORS.AUDIO)
                return

            // Text Types
            case FILE_TYPES.TEXT :
                switch (type[1]) {
                    case FILE_TYPES.TEXT_TYPES.PLAIN :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFileAlt }) => setFileIcon(faFileAlt))
                        setFileColor(FILE_COLORS.TEXT)
                       return

                    case FILE_TYPES.TEXT_TYPES.CODE_1 :
                    case FILE_TYPES.TEXT_TYPES.CODE_2 :
                    case FILE_TYPES.TEXT_TYPES.CODE_3 :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFileCode }) => setFileIcon(faFileCode))
                        setFileColor(FILE_COLORS.CODE)
                       return

                    default :
                        setDefault()
                        return
                }

            // Application Types
            case FILE_TYPES.APPLICATION :
                switch (type[1]) {
                    case FILE_TYPES.APPLICATION_TYPES.WORD_1 :
                    case FILE_TYPES.APPLICATION_TYPES.WORD_2 :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFileWord }) => setFileIcon(faFileWord))
                        setFileColor(FILE_COLORS.WORD)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_1 :
                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_2 :
                    case FILE_TYPES.APPLICATION_TYPES.POWERPOINT_3 :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFilePowerpoint }) => setFileIcon(faFilePowerpoint))
                        setFileColor(FILE_COLORS.POWERPOINT)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.PDF :
                        import('@fortawesome/free-regular-svg-icons')
                           .then(({ faFilePdf }) => setFileIcon(faFilePdf))
                        setFileColor(FILE_COLORS.PDF)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_1 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_2 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_3 :
                    case FILE_TYPES.APPLICATION_TYPES.EXCEL_4 :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFileExcel }) => setFileIcon(faFileExcel))
                        setFileColor(FILE_COLORS.EXCEL)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_1 :
                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_2 :
                    case FILE_TYPES.APPLICATION_TYPES.ARCHIVE_3 :
                        import('@fortawesome/free-regular-svg-icons')
                            .then(({ faFileArchive }) => setFileIcon(faFileArchive))
                        setFileColor(FILE_COLORS.ARCHIVE)
                        return

                    case FILE_TYPES.APPLICATION_TYPES.CSV :
                        import('@fortawesome/free-solid-svg-icons')
                            .then(({ faFileCsv }) => setFileIcon(faFileCsv))
                        setFileColor(FILE_COLORS.CSV)
                        return

                    default :
                        setDefault()
                        return
                }
                // End of case FILE_TYPES.APPLICATION
    
            default :
                setDefault()
                return
        }
    }, [fileType, setDefault])

    return (
        <>
            {fileIcon && <FontAwesomeIcon icon={fileIcon} style={fileColor} />}
        </>
    )
}
