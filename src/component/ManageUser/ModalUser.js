import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useDebugValue } from 'react';
import { getGroup } from '../../service/groupService';
import { createUser, updateUser } from '../../service/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ModalUser(props) {
    const defaultUser = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const defaultValidInput = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [groupData, setGroupData] = useState([]);
    const [userData, setUserData] = useState(defaultUser);
    const [isValidInput, setIsValidInput] = useState(defaultValidInput);

    useEffect(() => {
        fetchGroup();
    }, [])

    useEffect(() => {
        setDataModalUser();
    }, [props.user,props.action])

    
    const setDataModalUser = () => {
        if (props.action === "EDIT") {
            setUserData({...props.user, group: props.user.Group ? props.user.Group.id: ''});
        } else {
            setUserData({
                ...defaultUser,
                group: groupData.length > 0 ? groupData[0].id : ''
            })
            setIsValidInput(defaultValidInput)
        }
    }

    const checkValidInput = () => {
        setIsValidInput(defaultValidInput);
        if (props.action === "EDIT") {
            return true;
        }
        let arr = ['email', 'phone', 'password', 'group']
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput)
                _validInput[arr[i]] = false;
                setIsValidInput(_validInput);

                toast.error(`Không được để trống ${arr[i]}`);
                return false;
            }
        }
        let isPhoneValid = checkPhoneValid(userData.phone);
        if (!isPhoneValid) {
            toast.error(`Số điện thoại không hợp lệ`);
            let _validInput = _.cloneDeep(defaultValidInput)
                _validInput['phone'] = false;
                setIsValidInput(_validInput);
            return false
        }
        return true;
    }

    const checkPhoneValid = (p) => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(p);
    }
    
    const fetchGroup = async () => {
        let res = await getGroup();
        if (res && res.data && res.data.EC === 0) {
            setGroupData(res.data.DT)
            if (res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({...userData, group: groups[0].id})
            }
        }
    }

    const handleChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const handleConfirmUser = async () => {
        let check = checkValidInput();
        if (check === true) {
            let res = props.action === "CREATE" ? 
                await createUser({ ...userData, groupId: userData['group'] })
            :
                await updateUser({ ...userData, groupId: userData['group'] });
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                props.handleClose();
                setUserData({...defaultUser, group: groupData && groupData.length > 0 ? groupData[0].id : ''});
            } else {
                toast.error(res.data.EM);
                let _validInput = _.cloneDeep(defaultValidInput)
                _validInput[res.data.DT] = false;
                setIsValidInput(_validInput);
            }
        }
        
    }
    return ( 
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action === "CREATE" ? "Thêm người dùng" : "Cập nhật người dùng"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-add-user row'>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Email (<span style={{color:'red'}}>*</span>):</label>
                            <input
                                className={isValidInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'  
                                value={userData.email}
                                onChange={(e) => handleChangeInput(e.target.value, 'email')}
                                disabled = {props.action === "EDIT" ? true : false}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Điện thoại (<span style={{color:'red'}}>*</span>):</label>
                            <input
                                className={isValidInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text' 
                                value={userData.phone}
                                onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                                disabled = {props.action === "EDIT" ? true : false}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Tên:</label>
                            <input
                                className='form-control'
                                type='text' 
                                value={userData.username}
                                onChange={(e) => handleChangeInput(e.target.value,'username')}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            { props.action === "CREATE" &&
                                <>
                                    <label>Password (<span style={{ color: 'red' }}>*</span>):</label>
                                    <input
                                        className={isValidInput.password ? 'form-control' : 'form-control is-invalid'}
                                        type='password'
                                        value={userData.password}
                                        onChange={(e) => handleChangeInput(e.target.value, 'password')}
                                    />
                                </>
                            }
                        </div>
                        <div className='form-group col-12 col-sm-12'>
                            <label>Địa chỉ:</label>
                            <input
                                className='form-control'
                                type='text' 
                                value={userData.address}
                                onChange={(e) => handleChangeInput(e.target.value,'address')}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Giới tính</label>
                            <select
                                className="form-select"
                                onChange={(e) => handleChangeInput(e.target.value,'sex')}
                            >
                                <option defaultValue ="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className='form-group col-12 col-sm-6'
                        >
                            <label>Nhóm</label>
                            <select
                                className={isValidInput.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleChangeInput(e.target.value,'group')}
                                value={userData.group}
                            >
                                {groupData.length > 0 && groupData.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                }) }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}

export default ModalUser;