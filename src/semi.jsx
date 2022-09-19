import React,{ useState, useEffect} from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';

export default () => {
    const { Title, Paragraph } = Typography;

    const [imageList, setImageList] = useState([])
    const [fersh, setFresh] = useState({})

     const style = {
        width: '100%',
        height: '400px',
    };

    const titleStyle = { 
        position: 'absolute', 
        top: '100px', 
        left: '100px',
        color: '#1C1F23'
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    const renderLogo = () => {
        return (
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='semi_logo' style={{ width:87, height:31 }} />   
        );
    };

    const list = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png',
    ];

    const textList = [
        ['Semi 设计管理系统', '从 Semi Design，到 Any Design', '快速定制你的设计系统，并应用在设计稿和代码中'],
        ['Semi 物料市场', '面向业务场景的定制化组件，支持线上预览和调试', '内容由 Semi Design 用户共建'],
        ['Semi Pro (开发中)', '基于 40+ 真实组件代码设计', '海量页面模板前端代码一键转'],
    ];


    useEffect(() => {
      setImageList(list)
    },[])


    return (
      <div>{ imageList.length }
          <Carousel style={style} theme='dark' activeIndex={1}>123123
            {
              imageList.map((src, index) => {
                    return (
                        <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url(${src})` }}>
                            <Space vertical align='start' spacing='medium' style={titleStyle}>
                                {renderLogo()}
                                <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                <Space vertical align='start'>
                                    <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                    <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                </Space>
                            </Space>
                        </div>
                    );
                })
            }
        </Carousel>
      </div>
    );
};
