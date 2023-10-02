import { useState } from "react";
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

function Role() {
    const [listChild, setListChild] = useState({
        child1: {
            url: '',
            description: ''
        }
    })

    const handleOnchangeInput = (key, name, value) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        setListChild(_listChild);
    }

    const handleClickAdd = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        }
        setListChild(_listChild)
    }

    const handleDeleteEle = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListChild(_listChild);
    }

    return ( 
        <div className="role-container">
            <div className="container">
                <div className="role-parent mt-3">
                    <h4 className="tole-title">Thêm vai trò ... </h4>
                    {
                        Object.entries(listChild).map(([key, child], index) => {
                            return <div className="row role-child" key={`child-${key}`}>
                                <div className={`col-5 form-group ${key}`}>
                                    <label>URL</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        value={child.url}
                                        onChange={(e) => handleOnchangeInput(key,'url',e.target.value)}
                                    />
                                </div>
                                <div className={`col-5 form-group`}>
                                    <label>Mô tả</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        value={child.description}
                                        onChange={(e) => handleOnchangeInput(key,'description',e.target.value)}
                                    />
                                </div>
                                <div className="col-2 mt-4 action">
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => handleClickAdd()}
                                    >Thêm</button>
                                    {index >= 1 && 
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteEle(key)}
                                        >Xóa</button>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
     );
}

export default Role;