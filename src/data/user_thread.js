// {thread_id, uid, seen, fav, last_interaction}

/**
 * 
 * @param {int} tid 
 * @param {int} uid 
 * @param {bool} seen 
 * @param {bool} fav 
 * @param {Date} last_interaction 
 * @returns 
 */
export function UserThread(tid, uid, seen, fav, last_interaction) {
    return {
        "tid": tid,
        "uid": uid,
        "seen": seen,
        "fav": fav,
        "last_interaction": last_interaction
    }
}