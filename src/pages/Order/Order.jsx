import React from 'react'
import {connect} from 'react-redux'
import {List, message, Avatar, Spin, Card} from 'antd';

//包括对xmlHttpRequest、JSONP、CORS和CommonJS的支持。s
import reqwest from 'reqwest';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import './Order.less'
import orderAction from '../../store/actions/order'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Order extends React.Component {
    state = {
        data: [],
        loading: false,
    };

    loadedRowsMap = {};

    async componentDidMount() {
        await this.fetchData()
        // console.log(this.props.orderList);
        // this.fetchData(res => {
        //     this.setState({
        //         data: res.results,
        //     });
        // });
    }

    //用reqwest发送ajax请求
    fetchData = async () => {
        await this.props.getOrderListStore()
        this.setState({
            data: this.props.orderList
        });
    }
    // fetchData = callback => {
    // reqwest({
    //     url: fakeDataUrl,
    //     type: 'json',
    //     method: 'get',
    //     contentType: 'application/json',
    //     success: res => {
    //         callback(res);
    //     },
    // });
    // };
    //InfiniteLoader
    //当必须加载更多行时调用的回调函数。一旦行数据加载完成，就应该解析返回的承诺。
    //它将用于确定何时用新加载的数据刷新列表。这个回调函数可以被多次调用以响应单个滚动事件。
    handleInfiniteOnLoad = ({startIndex, stopIndex}) => {
        let {data} = this.state;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            this.loadedRowsMap[i] = 1;
        }
        //大于19条结束
        if (data.length > 10000) {
            message.warning('Virtualized List loaded all');
            this.setState({
                loading: false,
            });
            return;
        }
        //data数据小于19条就发送请求获取数据
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    //InfiniteLoader
    //负责跟踪每一行的加载状态。
    isRowLoaded = ({index}) => !!this.loadedRowsMap[index];

    //InfiniteLoader
    //出于性能考虑，虚拟化列表中的每一行都是通过使用rowRenderer函数来呈现的。
    //这个函数必须返回一个具有唯一键、应用样式并具有符合rowHeight的内容的元素
    //负责呈现给定索引的单行
    //index:行索引
    //key:在呈现的行数组内的唯一键
    //style:应用于row的样式对象(用于定位它)
    /*height: 73 left: 0 position: "absolute" top: 365 width: "100%"*/
    renderItem = ({index, key, style}) => {
        const {data} = this.state;
        const item = data[index];
        console.log(item);
        return (
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar}/>}
                    title={<a href="https://ant.design">{item.pname}</a>}
                    description={item.order_time}
                />
                <div>
                    <span>账户名 :{item.uname}</span><br/>
                    <span>价格 :{item.price}</span><br/>
                    <span>数量 :{item.num}</span>
                </div>
            </List.Item>
        );
    };

    render() {
        const {data} = this.state;
        const vlist = ({height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width}) => (
            //该组件呈现一个窗口化的元素列表(行)。它使用一个内部网格来渲染行，所有的道具都中继到那个内部网格。这意味着除了下面所示的道具外，该列表还接受网格道具
            <VList
                height={height} //列表的高度约束(确定实际渲染的行数)
                isScrolling={isScrolling} //该列表目前是否正在滚动
                onScroll={onChildScroll} //当滚动偏移量在内部可滚动区域内发生变化时调用
                scrollTop={scrollTop} //强制垂直滚动偏移;可用于同步组件之间的滚动
                onRowsRendered={onRowsRendered} //用刚刚渲染的行切片信息调用回调
                width={width} //列表的宽度

                autoHeight //列表的外部高度设置为“auto”。此属性应仅与WindowScroller HOC一起使用。
                overscanRowCount={2} //在列表的可见范围之上/之下呈现的行数。 这可以帮助减少在某些浏览器/设备上滚动时的闪烁
                rowCount={data.length} //列表中的行数。
                rowHeight={73} //可以是固定的行高(number)，也可以是返回给定索引的行高的函数:({index: number}): number
                rowRenderer={this.renderItem} //出于性能考虑，虚拟化列表中的每一行都是通过使用rowRenderer函数来呈现的。
                // 这个函数必须返回一个具有唯一键、应用样式并具有符合rowHeight的内容的元素
            />
        );
        const autoSize = ({height, isScrolling, onChildScroll, scrollTop, onRowsRendered}) => (
            //自动调整单个子节点的宽度和高度的高阶组件。
            <AutoSizer disableHeight>{/*//固定高度;如果指定，则不会管理子节点的height属性*/}
                {({width}) =>
                    vlist({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                        width,
                    })
                }
            </AutoSizer>
        );
        //height:视口的高度 num
        //isScrolling:指示表或列表是否在滚动 bool
        //onChildScroll:使用表格或列表的onScroll道具来“滚动”列表 fun
        //scrollTop:滚动到页面的距离 bool
        const infiniteLoader = ({height, isScrolling, onChildScroll, scrollTop}) => (
            //当用户在列表中向上或向下滚动时，管理即时获取数据的组件(高阶组件)
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded} //函数负责跟踪每一行的加载状态。
                loadMoreRows={this.handleInfiniteOnLoad} //当必须加载更多行时调用的回调函数。
                //一旦行数据加载完成，就应该解析返回的承诺。
                //它将用于确定何时用新加载的数据刷新列表。
                //这个回调函数可以被多次调用以响应单个滚动事件。
                rowCount={data.length} //列表中的行数;如果实际数字未知，可以任意高的数字。
            >
                {/*onRowsRendered:这个函数应该作为子进程的onRowsRendered属性传递。当用户滚动时，它通知加载程序。*/}
                {({onRowsRendered}) =>
                    autoSize({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                    })
                }
            </InfiniteLoader>
        );
        return (
            <Card>
                <List>
                    {/*根据窗口的滚动位置滚动表或列表组件的组件。该组件目前不能与水平滚动的网格一起工作，因为水平滚动会重置内部scrollTop*/}
                    {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
                    {this.state.loading && <Spin className="demo-loading"/>}
                </List>
            </Card>

        );
    }
}

function mapStateToProps(state) {
    return {
        orderList: state.order.orderList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getOrderListStore() {
            await dispatch(orderAction.getOrderList())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Order)