import Modal from '../Modal/Modal';
import Button from '../Button/Button';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Confirm', danger = true }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="text-secondary">{message}</p>
    </Modal>
  );
}
