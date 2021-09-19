import { useReducer, useEffect } from "react"
import firestoreDb from "../../firebase"
import { doc, getDoc, query, where, onSnapshot, orderBy } from "@firebase/firestore"
import useAuthCtx from "../../contexts/AuthContext"

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

const reducer = (state, { type, payload }) => {
    switch(type) {
        case ACTIONS.SELECT_FOLDER :
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: [],
            }

        case ACTIONS.UPDATE_FOLDER :
            return {
                ...state,
                folder: payload.folder,
            }

        case ACTIONS.SET_CHILD_FOLDERS :
            return {
                ...state,
                childFolders: payload.childFolders,
            }

        default :
            return state
    }
}

export default function useFolder(folderId = null, folder = null) {
    const { currentUser } = useAuthCtx()
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
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
                payload: { folder: ROOT_FOLDER }
            })
        }

        getDoc(doc(firestoreDb.folders, folderId)).then(doc => {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: firestoreDb.getDocData(doc) }
            })
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        })
    }, [folderId])

    useEffect(() => {        
        const q = query(
            firestoreDb.folders,
            where('userId', '==', currentUser.uid),
            where('parentId', '==', folderId),
            orderBy('createdAt')
        )

        const unsubscribe = onSnapshot(q, querySnapshot => {
            const childFolders = []
            querySnapshot.forEach( doc => childFolders.push( firestoreDb.getDocData(doc) ) )

            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders }
            }) 
        })

        return unsubscribe
    }, [folderId, currentUser])

    return state
}