import './App.css';
import {Button, Card, Col, Collapse, Input, Modal, Row} from "antd";
import {CloseOutlined, SearchOutlined} from '@ant-design/icons'

import {phone} from "./store/store";
import {sum} from "./store/store";
import {Image} from 'antd';
import {useEffect, useState} from "react";


const {Panel} = Collapse;


function App() {
    const [foundTrack, setFoundTrack] = useState([]); //пошук по назві збіги
    const [searchValue, setSearchValue] = useState(""); //пошук по назві значення інпута
    const [openSearch, setOpenSearch] = useState(false); //пошук по назві вкл-викл пошук

    let handleSearch = (e) => {
        setSearchValue(e)
        let findTrack = phone.filter(function (item) {
            return item.name.toLowerCase().search(
                e.toLowerCase()) !== -1;
        });
        setFoundTrack(findTrack)
        setOpenSearch(true)
    }
    let closeSearch = () => {
        setSearchValue("")
        setFoundTrack([])
    }
    useEffect(() => {
        searchValue === "" && setOpenSearch(false)
    }, [searchValue]);


let showPhone = openSearch ? foundTrack : phone








    const potracheno = () => {
        let potrat = 0
        phone.forEach(el =>  potrat += el.price)
        return potrat
    }


    const info = (photo) => {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <Image.PreviewGroup>
                        {photo.map((el, key) => <Image
                            key={key}
                            width={200}
                            src={el}
                        />)}
                    </Image.PreviewGroup>
                </div>
            ),
            onOk() {
            },
        });
    };


    let card = showPhone.map((el, key) => (
        <Card key={key}
              hoverable
              style={{width: 410}}
        >
            <div className={"ava"}>
            <Image
                width={200}
                src={el.photo[0]}
            />
            </div>

            <div className={"infoCard"}>
                <div className={"name"}>
                    <span>{el.name}</span>
                </div>
                <div className={"serial"}>
                    <p>S№</p>
                    <span>{el.serial}</span>
                </div>
                <div className={'battery'}><p>батарея:</p>
                    <span>{el.battery}</span>
                </div>
                <div className={'accessories'}>
                    <p>аксуссуары:</p>
                    <span>{el.accessories}</span>
                </div>
                <div className={'price'}>
                    <p>цена закупки:</p>
                    <span>{el.price}</span>
                </div>
            </div>
            <Button type={"primary"} onClick={() => info(el.photo)}>Дополнительные фотографии</Button>
        </Card>))


    return (

        <div className="App">
            <Row>
                <Col span={24}>
                    <Collapse
                        bordered={true}
                        defaultActiveKey={['1']}
                        className="site-collapse-custom-collapse"
                    >
                        <Panel header="Расчеты" key="1" className="site-collapse-custom-panel">
                            <p>Первая сума денег <b>{sum.firstMoney}</b></p>
                            <p>Деньги которые доплнительно отправили <b>{sum.dopMoney}</b></p>
                            <p>Деньги которые должен вернуть за переезд <b>{sum.dolg}</b> сколько осталось вернуть <b>{sum.dolg - (sum.sumaZaTelefon * phone.length) - sum.dolozhil}</b></p>
                            <p>Деньги которые отдолжили что бы закупить телефоны <b>{sum.odolzhil}</b></p>
                            <p>Деньги которые докладывал вовремя покупки телефона <b>{sum.dolozhil}</b></p>
                            <p>Потрачено на телефоны <b>{potracheno()}</b></p>
                            <p style={{color: "red"}}>Сума на руках <b>{sum.firstMoney - potracheno() - sum.dolg + sum.dolozhil + sum.odolzhil + sum.dopMoney }</b></p>

                        </Panel>

                    </Collapse>
                </Col>
            </Row>
            <Row>
                <Col span={24} className={"input_block"}>
                    <div className="position">
                    <Input
                            placeholder="Пошук телефона за назвою"
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}

                        />
                        {openSearch ?
                            <button className={"input_btn_search"} onClick={() => closeSearch()}>
                                <CloseOutlined />
                            </button> :
                            <button className={"input_btn_search"}>
                                <SearchOutlined />
                            </button>
                        }
                    </div>


                </Col>
            </Row> <Row>
                <Col span={24} className={"phone"}>
                    {card}
                </Col>
            </Row>

        </div>
    );
}

export default App;
