import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelConfirmDelete(props) {
    return ( 
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa người dùng <b style={{ color: 'red' }}>{ props.user.username}</b></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={props.handleConfirmDelete}>
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}

export default ModelConfirmDelete;