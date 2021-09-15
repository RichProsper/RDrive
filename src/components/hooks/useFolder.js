import { useReducer, useEffect } from "react"
import firestoreDb from "../../firebase"
import { doc, getDoc } from "@firebase/firestore"

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder'
}

const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

const reducer = (state, { type, payload }) => {
    switch(type) {
        case ACTIONS.SELECT_FOLDER :
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            }

        case ACTIONS.UPDATE_FOLDER :
            return {
                ...state,
                folder: payload.folder
            }

        default :
            return state
    }
}

export default function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: {
                folderId,
                folder
            }
        })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {
                    folderId,
                    folder: ROOT_FOLDER
                }
            })
        }

        // console.log( getDoc(doc(firestoreDb.folders, folderId)) )
        getDoc(doc(firestoreDb.folders, folderId)).then(doc => {
            console.log(doc.data())
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {
                    folderId,
                    folder: ROOT_FOLDER
                }
            })
        })
    }, [folderId])

    return state
}