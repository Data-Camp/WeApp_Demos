var ApiDomain = 'http://rap.taobao.org/mockjsdata/11071';

module.exports = {
    getImageContent: ApiDomain + '/api/image_content?id={{id}}',
    getTopic: ApiDomain + '/api/topic?id={{id}}',
    getHtmlTopic: ApiDomain + '/api/html_topic?id={{id}}'
}