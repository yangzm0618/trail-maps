/**
 * Created by qiezijiucai 619025283@qq.com on 2017/10/10.
 */

var API={
    getTrailData:function(){
        return $.get("./mock/trailData.json")
    }
};

API.getTrailData().then(function(data){
    var viewContainer=document.getElementById("J_Main"),viewWidth=viewContainer.offsetWidth,viewHeight=viewContainer.offsetHeight;
    trailGraphInit(data,viewContainer,viewWidth,viewHeight,viewContainer);
});

/**
 *
 * @param data 返回的数据
 * @param container  图表容器元素
 * @param viewWidth  图表容器宽度
 * @param viewHeight 图表容器高度
 */
function trailGraphInit(data,container,viewWidth,viewHeight,viewContainer){
    var myChart = echarts.init(viewContainer);
    var option = {
        grid: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        xAxis: {
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            max: viewWidth,
            min: 0
        },
        yAxis: {
            silent: true,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            max: viewHeight,
            min: 0
        },
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(50,50,50,0.7)",
            borderColor: "#46bee9",
            borderWidth: 1,
            padding: [5, 10, 5, 10],
            textStyle: {
                color: "#46bee9",
                fontSize: 14,
                fontWeight: "bolder"
            }
        },
        series: [{
            type: 'effectScatter',
            coordinateSystem: 'cartesian2d',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke',
                period: 7,
                scale: 1
            },
            symbolSize: [230, 113],
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    color: '#030210',
                    border: 1,
                    borderColor: "#030210"
                },
                emphasis: {
                    borderColor: "#46bee9",
                    opacity: 1
                }
            },
            label:{
                normal:{
                    rich:{
                        iconStyle:{
                            width:48,
                            height:48,
                            align:"left",
                            backgroundColor:{
                                image:""
                            }
                        },
                        enTitleStyle:{
                            color:"#fff",
                            width:170,
                            padding:[0,0,0,15],
                            align:"left",
                            verticalAlign:"top"
                        },
                        zhTitleStyle:{
                            color:"#fff",
                            align:"left",
                            fontSize:23,
                            width:90,
                            height:35,
                            padding:[0,0,0,-170],
                            verticalAlign:"bottom"
                        },
                        descTitleStyle:{
                            color:"#c0cfde",
                            align:"left",
                            width:93,
                            height:25,
                            fontSize:14
                        },
                        descContentStyle:{
                            color:"#fff",
                            align:"left",
                            fontSize:16,
                            width:93
                        }
                    },
                    formatter:function(params){
                        var descTitleArr=[],descContentArr=[],descTitleStr="",descContentStr="";
                        params.data.desc.forEach(function(descItem){descTitleArr.push(descItem["title"]);descContentArr.push(descItem["num"])});
                        descTitleStr=descTitleArr.reduce(function(prev,cur){return prev+'{descTitleStyle|'+cur+'}'},"");
                        descContentStr=descContentArr.reduce(function(prev,cur){return prev+'{descContentStyle|'+cur+'}'},"");
                        return '{iconStyle|}{enTitleStyle|'+params.data.title.en+'}{zhTitleStyle|'+params.data.title.zh+'}'+'\n'+descTitleStr+'\n'+descContentStr;
                    },
                    color:"#fff",
                    show:true,
                    width:230,
                    height:113,
                    padding:[20,0,0,30],
                    fontFamily:"microsoft yahei"
                }
            },
            data: [],
            tooltip: {
                formatter: function (params) {
                    return "<div >" +
                        "<div style='padding-bottom:2px; font-weight:bold;'>" + params.name + "</div>" +
                        "<div style='padding-bottom:5px;font-size:12px; font-weight:normal;word-wrap: break-word;word-break:break-all;'>" + params["data"]["desc"].reduce(function(prev,cur){return prev+cur['title']+cur['num']+"\n"},"") + "</div>" +
                        "</div>";
                }
            }
        }, {
            coordinateSystem: 'cartesian2d',
            type: 'lines',
            polyline: true,
            zlevel: 1,
            symbol: "circle",
            effect: {
                show: true,
                constantSpeed: 70,
                trailLength: 0.7,
                symbolSize: 5,
                loop: true
            },
            lineStyle: {
                normal: {
                    color: '#46bee9',
                    opacity: 0.07,
                    width: 1,
                    curveness: 0
                }
            },
            data: []
        }]
    };
    option["series"][0]["data"]=data["effectScatterData"];
    option["series"][1]["data"]=data["linesData"];
    option["series"].forEach(function(seriesItem){
        if(seriesItem["type"]=="effectScatter"){
            seriesItem["data"].forEach(function(dataItem){
                dataItem["value"][0]*=viewWidth;
                dataItem["value"][1]*=viewHeight;
            });
        }
        if(seriesItem["type"]=="lines"){
            seriesItem["data"].forEach(function(dataItem){
                dataItem["coords"].forEach(function(coordsItem){
                    coordsItem[0]*=viewWidth;
                    coordsItem[1]*=viewHeight;
                })
            });
        }
    });
    myChart.setOption(option);
    myChart.on('click', function (params) {
        if (params.componentType === 'series' && params.componentSubType=="effectScatter") {
            alert("hello world!")
        }
    });
}






