import React from "react"
import { Carousel, WingBlank } from 'antd-mobile';
import { connect } from "dva"
class RadioPage extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 300,
    }
    componentWillMount() {
        this.props.dispatch({
            type: "radio/getDJListAsync"
        })
        this.props.dispatch({
            type: "radio/getProducts_recommendedAsync"
        })
        //获取全部电台分类
        this.props.dispatch({
            type: "radio/getRadioTypeAsync"
        })
        // console.log("componentWillMount");
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);

    }
    toRadioDetails=()=>{
        // console.log("toRadioDetails");
        
    }
    /* 电台推荐  http://106.12.79.128:666/dj/hot */
    /* 电台分类 http://106.12.79.128:666/dj/catelist */
    /* 付费精选 http://106.12.79.128:666/dj/paygift?limit=10&offset=20 */

    render() {
        //电台推荐
        const radioList = this.props.radioList
        /* console.log(radioList); */
        const radio_recommendedList = radioList.map(item =>
            <li onClick={this.toRadioDetails} key={item.id}>
                <img src={item.picUrl} />
                <span>{item.name}</span>
                <p>{item.copywriter}</p>
            </li>)
        //精品推荐
        const Products_recommended = this.props.Products_recommendedList
        const Products_recommendedList = Products_recommended.map(item =>
            <li onClick={this.toRadioDetails} key={item.id}>
                <img src={item.picUrl} />
                <span>{item.name}</span>
                <p>{item.subCount}</p>
            </li>)
        //创作|翻唱
        return (
            <WingBlank>
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: "100px" }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <div className="styles.The_host">
                    <div className="styles.radio_recommended">{/* 主播推荐 */}
                        <div>
                            <span>电台推荐</span>
                            <input type="button" value="换一换" />
                        </div>
                        <div className="styles.radio_list">
                            <ul>
                               {radio_recommendedList}
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Products_recommended">
                        <div>
                            <b>精品推荐</b> <span>你值得拥有的优质内容</span>
                            <input type="button" value="全部精品" />
                        </div>
                        <div className="Products——list">
                            <ul>
                               {Products_recommendedList}
                            </ul>
                        </div>
                    </div>
                    <div className="styles.creation|cover">
                        <div>
                            <span>创作|翻唱></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Audio_book">
                        <div>
                            <span>有声书</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.emotionalFM">
                        <div>
                            <span>情感调频></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.radio_theatre">
                        <div>
                            <span>广播剧></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Music_story">
                        <div>
                            <span>音乐故事></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.entertainment">
                        <div>
                            <span>娱乐影视></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.3D_electronic">
                        <div>
                            <span>3D电子></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Prose_reading">
                        <div>
                            <span>美文读物></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.anime">
                        <div>
                            <span>二次元></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Talk_show">
                        <div>
                            <span>脱口秀></span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="styles.Knowledge_skills">
                        <div>
                            <span>知识技能</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>商业财经</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>人文历史</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>外语世界</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>亲子宝贝</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>相声曲艺</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>旅途城市</span>
                        </div>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span>热门分类</span>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span>更多分类</span>
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </WingBlank>
        );
    }
}
const mapStateToProps = state => {
    return {
        msg: "揍你",
        radioList: state.radio.radioList,
        Products_recommendedList:state.radio.Products_recommended
    }
}
export default connect(mapStateToProps)(RadioPage)

