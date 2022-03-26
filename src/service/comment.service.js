const connection = require('../app/database');

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }

  async reply(momentId, content, commentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, commentId, userId]);
    return result;
  }

  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentList(momentId) {
    const statement = `SELECT 
        c.id, c.content, c.comment_id, c.createAt, c.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) user
        FROM comment c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE moment_id = ?;`
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();