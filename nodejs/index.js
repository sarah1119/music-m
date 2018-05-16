/**
 * Created by qiaox on 2018/5/8.
 */
var app = require('express')();
var request = require('superagent');
var cheerio = require('cheerio');
var cors = require('cors');
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization']
}));
/** * 开启路由
 * * 第一个参数指定路由地址,当前指向的是 localhost:3000/
 * * 如果需要其他路由,可以这样定义,比如 需要我们的获取推荐歌单的路由* /recommendLst
 * * app.get('/recommendLst', function(req, res){}); */
// app.use(express.static(require('path').join(__dirname, '../music')));
// express 开放 /recommendLst API
app.get('/', function (req, res) {
    res.send('hello haha ');
});
app.get('/banner', function (req, res) {
    // 初始化返回对象
    var resObj = {
        code: 200,
        data: []
    };
    // 使用 superagent 访问 discover 页面
    request.get('http://music.163.com/discover')
        .end(function (err, _response) {
                if (!err) {
                    // 请求成功
                    var dom = _response.text;
                    // console.log(dom);
                    // 使用 cheerio 加载 dom
                    var $ = cheerio.load(dom);
                    // 定义我们要返回的数组
                    var bannerLst = [
                        {
                            src:'http://p1.music.126.net/SPzFztesG0KPZKnq-9V3qA==/109951163291546754.jpg',
                            href:'http://music.163.com/m/song?id=557583281'
                        },
                        {
                            src:'http://p1.music.126.net/-DtIvbFj7S9QEIhwvZlKkQ==/109951163291456756.jpg',
                            href:'http://music.163.com/m/song?id=557581284'

                        },
                        {
                            src:' http://p1.music.126.net/-ooNw6TialP3ByGYLyW_9A==/109951163291650280.jpg',
                            href:'http://music.163.com/m/song?id=557584108'

                        }
                    ];
                    // 获得 .m-cvrlst 的 ul 元素
                    // $('.ban').eq(0).find('a').each(function (index, element) {
                    //     // console.log(element)
                    //     // 获得 a 链接
                    //     // var banLink = $(element).find('.u-cover').find('a');
                    //     // console.log(banLink.html());
                    //     // // 获得 cover 歌单封面
                    //     // var cover = $(element).find('.u-cover').find('img').attr('src');
                    //     // // 组织单个推荐歌单对象结构
                    //     // var bannerLst = {
                    //     //     id: cvrLink.attr('data-res-id'),
                    //     //     title: cvrLink.attr('title'),
                    //     //     href: 'http://music.163.com' + cvrLink.attr('href'),
                    //     //     type: cvrLink.attr('data-res-type'),
                    //     //     cover: cover
                    //     // };
                    //     // // 将单个对象放在数组中
                    //     // bannerLst.push(bannerLst);
                    //     //  aa=element
                    // });
                    // 替换返回对象
                    // resObj.data = aa;

                    resObj.data = bannerLst;
                    // res.send('get success');
                }
                else {
                    resObj.code = 404;
                    console.log('Get data error !');
                }
                // 响应数据
                res.send(resObj);
            }
        );
});
app.get('/recommendLst', function (req, res) {
    // 初始化返回对象
    var resObj = {
        code: 200,
        data: []
    };
    // 使用 superagent 访问 discover 页面
    request.get('http://music.163.com/discover')
        .end(function (err, _response) {
                if (!err) {
                    // 请求成功
                    var dom = _response.text;
                    console.log(dom);
                    // 使用 cheerio 加载 dom
                    var $ = cheerio.load(dom);
                    // 定义我们要返回的数组
                    var recommendLst = [];
                    // 获得 .m-cvrlst 的 ul 元素
                    $('.m-cvrlst').eq(0).find('li').each(function (index, element) {
                        // 获得 a 链接
                        var cvrLink = $(element).find('.u-cover').find('a');
                        console.log(cvrLink.html());
                        // 获得 cover 歌单封面
                        var cover = $(element).find('.u-cover').find('img').attr('src');
                        // 组织单个推荐歌单对象结构
                        var recommendItem = {
                            id: cvrLink.attr('data-res-id'),
                            title: cvrLink.attr('title'),
                            href: 'http://music.163.com' + cvrLink.attr('href'),
                            type: cvrLink.attr('data-res-type'),
                            cover: cover
                        };
                        // 将单个对象放在数组中
                        recommendLst.push(recommendItem);
                    });
                    // 替换返回对象
                    resObj.data = recommendLst;
                    // res.send('get success');
                }
                else {
                    resObj.code = 404;
                    console.log('Get data error !');
                }
                // 响应数据
                res.send(resObj);
            }
        );
});
// 定义根据歌单id获得歌单详细信息的API
app.get('/playlist/:playlistId', function (req, res) {
    // 获得歌单ID
    var playlistId = req.params.playlistId;
    // 定义返回对象
    var resObj = {
        code: 200,
        data: {}
    };
    /** * 使用 superagent 请求
     *  * 在这里我们为什么要请求 http://music.163.com/playlist?id=${playlistId}
     *  * 简友们应该还记得 网易云音乐首页的 iframe * 应该还记得去打开 调试面板的 Sources 选项卡
     *  * 那么就可以看到在歌单页面 iframe 到底加载了什么 url */
    request.get(`http://music.163.com/playlist?id=${playlistId}`)
        .end(function (err, _response) {
            if (!err) {
                // 定义歌单对象
                var playlist = {
                    id: playlistId
                };
                // 成功返回 HTML, decodeEntities 指定不把中文字符转为 unicode 字符
                // 如果不指定 decodeEntities 为 false , 例如 " 会解析为 "
                var $ = cheerio.load(_response.text, {decodeEntities: false});
                // 获得歌单 dom
                var dom = $('#m-playlist');
                // 歌单标题
                playlist.title = dom.find('.tit').text();
                // 歌单拥有者
                playlist.owner = dom.find('.user').find('.name').text();
                // 创建时间
                playlist.create_time = dom.find('.user').find('.time').text();
                // 歌单被收藏数量
                playlist.collection_count = dom.find('#content-operation')
                    .find('.u-btni-fav')
                    .attr('data-count');
                // 分享数量
                playlist.share_count = dom.find('#content-operation')
                    .find('.u-btni-share')
                    .attr('data-count');
                // 评论数量
                playlist.comment_count = dom.find('#content-operation')
                    .find('#cnt_comment_count').html();
                // 标签
                playlist.tags = [];
                dom.find('.tags')
                    .eq(0)
                    .find('.u-tag')
                    .each(function (index, element) {
                        playlist.tags.push($(element).text());
                    })
                // 歌单描述
                playlist.desc = dom.find('#album-desc-more').html();
                // 歌曲总数量
                playlist.song_count = dom.find('#playlist-track-count').text();
                // 播放总数量
                playlist.play_count = dom.find('#play-count').text();
                resObj.data = playlist;
            } else {
                resObj.code = 404;
                console.log('Get data error!');
            }
            res.send(resObj);
        });
});
// 定义根据歌单id获得歌单所有歌曲列表的API
app.get('/song_list/:playlistId', function(req, res){
    // 获得歌单ID
    var playlistId = req.params.playlistId;
    // 定义返回对象
    var resObj = { code: 200, data: [] };
    request.get(`http://music.163.com/playlist?id=${playlistId}`)
        .end(function(err, _response){ if (!err) {
            // 成功返回 HTML
            var $ = cheerio.load(_response.text,{decodeEntities: false});
            // 获得歌单dom
            var dom = $('#m-playlist');
            resObj.data = JSON.parse( dom.find('#song-list-pre-cache')
                .find('textarea').html() );
        } else {
            resObj.code = 404 ;
            console.log('Get data error!');
        }
            res.send( resObj );
        });
});



/**
 * 开启express服务,监听本机3000端口
 * 第二个参数是开启成功后的回调函数
 */
var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log(`express app listening at http://localhost:${port}`);
});
