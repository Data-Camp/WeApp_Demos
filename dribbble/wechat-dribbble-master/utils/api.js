const HOST = "https://api.dribbble.com/v1/"; 
const ORIGIN = "https://dribbble.com/";
const SERVER = "http://wechat.zzetao.com/";
// const SERVER = "http://127.0.0.1:3000/";

module.exports = {
    getShot: function(id) {
        return HOST + 'shots/' + id;
    },
    getShots: HOST + 'shots',
    getShotAttachments: function(id) {
        return HOST + 'shots/' + id + '/attachments';
    },
    getShotComments: function(id) {
        return HOST + 'shots/' + id + '/comments';
    },
    getShotCommentLikes: function(shot_id, comment_id) {
        return HOST + 'shots/' + shot_id + '/comments/' + comment_id + '/likes';
    },
    getShotRebounds: function(shot_id) {
        return HOST + 'shots/' + shot_id + '/rebounds';
    },
    getShotProjects: function(shot_id) {
        return HOST + 'shots/' + shot_id + '/projects';
    },
    createComment: function(id) {
        return HOST + 'shots/' +id + '/comments';
    },
    // post / delete
    createLikeComment: function(shot_id, comment_id) {
        return HOST + 'shots/' + shot_id + '/comments/' + comment_id + '/like';
    },
    getUserShots: function(user_id) {
        return HOST + 'users/' + user_id + '/shots';
    },
    getDesigners: SERVER + 'designers',
    getDesignersShots: function(ids) {
        /*
            [1,2,3] => "1&user_ids[]=2&user_ids[]=3"
         */
        let idsToQuery = ids.join('&user_ids[]=');
        
        return ORIGIN + 'designers/shots?user_ids[]=' + idsToQuery;
    },
    getDesignerShots: ORIGIN + 'designers/shots',
}