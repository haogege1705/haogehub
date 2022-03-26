const connection = require('../app/database');

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES(?, ?);`
    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }


  async getMomentById(momentId) {
    const statement = `SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) author,
      IF(COUNT(l.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels,
       (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
         JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                     'user', JSON_OBJECT('id', cu.id, 'name', cu.name,'avatar', cu.avatar_url))
                    ),NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
       (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) image
       FROM moment m
       LEFT JOIN users u ON m.user_id = u.id
       LEFT JOIN moment_label ml ON m.id = ml.moment_id
       LEFT JOIN label l ON ml.label_id = l.id
       WHERE m.id = ?
       GROUP BY m.id; `
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `SELECT 
      moment.id momentId, 
      moment.content, 
      moment.createAt, 
      moment.updateAt, 
      JSON_OBJECT('user_id', users.id, 'name', users.name,'avatar', users.avatar_url) userVO,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id  =  moment.id) commentCount,
      (SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id  =  moment.id) labelCount,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) FROM file WHERE moment.id = file.moment_id) image
      FROM moment LEFT JOIN users ON moment.user_id = users.id LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async updateMoment(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result[0];
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }

}

module.exports = new MomentService();