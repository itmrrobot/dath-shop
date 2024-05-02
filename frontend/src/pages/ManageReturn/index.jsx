import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../../chartComp/Header';
import classNames from 'classnames/bind';
import styles from './ManageReturn.module.scss';
import { formatPrice, priceDiscount } from '../../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { UseContextUser } from '../../hooks/useContextUser';
import ModalDetailReturn from './ModalDetailReturn';
import { Modal } from 'antd';

import { toast } from 'react-toastify';
import { url } from '../../constants';
const cx = classNames.bind(styles);

function ManageReturn() {
    const [response, setResponse] = useState();
    const [pagCurr, setPagCurr] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState();
    console.log(order);
    const [checkChange, setCheckChange] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const state = useContext(UseContextUser);
    const pagName = ['Confirmating', 'Picking up', 'Received', 'Refund', 'Returned', 'Cancel'];
    const date = (d) => {
        const currentDate = new Date(d);
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        let date = currentDate.getDate();
        let month = currentDate.getMonth();
        const monthAbbreviation = monthNames[month];

        let year = currentDate.getFullYear();
        return `${date} ${monthAbbreviation}, ${year}`;
    };
    useEffect(() => {
        var accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios
            .get(`${url}/returns`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                let returnOrder = [...res.data].reverse();
                if (pagCurr === 0) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 1);
                } else if (pagCurr === 1) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 2);
                } else if (pagCurr === 2) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 3);
                } else if (pagCurr === 3) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 4);
                } else if (pagCurr === 4) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 5);
                } else if (pagCurr === 5) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 6);
                }
                // setOrders(orderUser);
                setResponse(returnOrder);
            });
    }, [pagCurr, checkChange]);
    const handleOk = async () => {
        var accessToken = JSON.parse(localStorage.getItem('accessToken'));
        try {
            await axios.put(
                `${url}/returns/update/${order?.id}`,
                {
                    status: 6,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            await axios.put(`${url}/order/update/${order?.Orders[0]?.id}`, {
                status: 3,
            });
            setCheckChange((prev) => !prev);
            toast.success('Huỷ đơn hàng hoàn trả thành công');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Huỷ đơn hàng thất bại');
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Header title="MANAGER RETURN" subtitle="View & Managing Returns!" />
            <div className={cx('wrapper')}>
                <ul className={cx('navigate')}>
                    {pagName.map((item, index) => (
                        <li
                            key={item}
                            className={cx({ li_active: index === pagCurr })}
                            onClick={() => {
                                setPagCurr(index);
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <ul className={cx('responsive-table')}>
                    <li className={cx('table-header')}>
                        <div className={cx('col', 'col-1')}>
                            {/* <FontAwesomeIcon icon={faImage}></FontAwesomeIcon> */}
                            Return ID
                        </div>
                        <div className={cx('col', 'col-2')}>status</div>
                        <div className={cx('col', 'col-3')}>Date Return</div>
                        <div className={cx('col', 'col-4')}>Adrress</div>
                        <div className={cx('col', 'col-5')}>Total</div>
                        <div className={cx('col', 'col-6')}></div>
                        <div className={cx('col', 'col-7')}></div>
                        <div className={cx('col', 'col-8')}></div>

                        {/* <div className={cx('col', 'col-9')}></div> */}
                    </li>
                    {response?.map((order, index) => {
                        console.log(order);
                        return (
                            <li key={index} className={cx('table-row')}>
                                <div className={cx('col', 'col-1', 'name')} data-label="ID">
                                    RT_#2024{order?.id}
                                </div>
                                <div className={cx('col', 'col-2', 'name')} data-label="ID">
                                    {order.status === 1 && <p>Confirmation</p>}
                                    {order.status === 2 && <p>Picking up</p>}
                                    {order.status === 3 && <p>Received</p>}
                                    {order.status === 4 && <p>Refund</p>}
                                    {order.status === 5 && <p>Returned</p>}
                                    {order.status === 6 && <p>Cancel</p>}
                                </div>
                                <div
                                    className={cx('col', 'col-3', 'name')}
                                    data-label="Product Name"
                                >
                                    {date(order?.createdAt)}
                                </div>
                                <div className={cx('col', 'col-4', 'name')} data-label="Price">
                                    {/* {item.price} */}
                                    {/* {formatPrice(order?.amount)} */}
                                    {order?.address?.replace(/[\[\]"]+/g, '')}
                                </div>
                                {order?.Orders.map((prod) => {
                                    return (
                                        <div
                                            className={cx('col', 'col-5', 'name')}
                                            data-label="Discount"
                                        >
                                            {/* {order.id} */}
                                            {formatPrice(prod?.total)}
                                        </div>
                                    );
                                })}

                                {order?.status === 1 && pagCurr === 0 && (
                                    <>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                var accessToken = JSON.parse(
                                                    localStorage.getItem('accessToken'),
                                                );
                                                axios
                                                    .put(
                                                        `${url}/returns/update/${order?.id}`,
                                                        {
                                                            status: 2,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${accessToken}`,
                                                            },
                                                        },
                                                    )
                                                    .then((res) => {
                                                        setCheckChange((prev) => !prev);
                                                        toast.success(
                                                            'Xác nhận đơn hoàn trả thành công',
                                                        );
                                                    })
                                                    .catch((err) => console.log(err));
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order?.status === 2 && pagCurr === 1 && (
                                    <>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                var accessToken = JSON.parse(
                                                    localStorage.getItem('accessToken'),
                                                );
                                                axios
                                                    .put(
                                                        `${url}/returns/update/${order?.id}`,
                                                        {
                                                            status: 3,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${accessToken}`,
                                                            },
                                                        },
                                                    )
                                                    .then((res) => {
                                                        setCheckChange((prev) => !prev);
                                                        toast.success(
                                                            'Xác nhận đã nhận hàng hoàn trả từ khách hàng thành công! Đang trên đường giao đến shop',
                                                        );
                                                    })
                                                    .catch((err) => console.log(err));
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order?.status === 3 && pagCurr === 2 && (
                                    <>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                var accessToken = JSON.parse(
                                                    localStorage.getItem('accessToken'),
                                                );
                                                axios
                                                    .put(
                                                        `${url}/returns/update/${order?.id}`,
                                                        {
                                                            status: 4,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${accessToken}`,
                                                            },
                                                        },
                                                    )
                                                    .then((res) => {
                                                        setCheckChange((prev) => !prev);
                                                        toast.success(
                                                            'Xác nhận đã nhận hàng hoàn trả từ khách hàng về shop thành công!. Tiến hành refund',
                                                        );
                                                    })
                                                    .catch((err) => console.log(err));
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            disabled
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order?.status === 4 && pagCurr === 3 && (
                                    <>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                var accessToken = JSON.parse(
                                                    localStorage.getItem('accessToken'),
                                                );
                                                axios
                                                    .put(
                                                        `${url}/returns/update/${order?.id}`,
                                                        {
                                                            status: 5,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${accessToken}`,
                                                            },
                                                        },
                                                    )
                                                    .then((res) => {
                                                        setCheckChange((prev) => !prev);
                                                        toast.success('Đã refund');
                                                    })
                                                    .catch((err) => console.log(err));
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order?.status === 5 && pagCurr === 4 && (
                                    <>
                                        <Button primary manageReturn disabled>
                                            Hehe
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            disabled
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order?.status === 6 && pagCurr === 5 && (
                                    <>
                                        <Button primary manageReturn disabled>
                                            Hehe
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            manageReturn
                                            disabled
                                            onClick={() => {
                                                handleShow();
                                                setOrder(order);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ModalDetailReturn
                show={showModal}
                handleClose={handleClose}
                returnOrder={order}
            ></ModalDetailReturn>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn huỷ đơn hàng này không?</p>
            </Modal>
        </>
    );
}

export default ManageReturn;