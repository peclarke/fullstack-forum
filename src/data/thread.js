export function Thread(created_at, title, author, body, replies) {
    return {
        "created_at": created_at, //datetime (DD-MM-YYYY)
        "title": title,
        "author": author, // uid
        "body": body,
        "replies": replies
    }
}