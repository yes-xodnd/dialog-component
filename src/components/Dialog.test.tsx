import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Dialog, { DEFAULT_DIALOG_ACTION_LABEL } from './Dialog';
import noop from '../utils/noop';

describe('Dialog', () => {
  it('content를 렌더링한다.', () => {
    const content = 'test content';

    render(<Dialog message={{ type: 'confirm', content }} close={noop} />);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('alert 타입이면, 확인 버튼만 렌더링한다.', () => {
    render(<Dialog message={{ type: 'alert', content: '' }} close={noop} />);

    const confirmButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.confirm,
    });

    const cancelButton = screen.queryByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.cancel,
    });

    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeNull();
  });

  it('confirm 타입이면, 확인 및 취소 버튼을 렌더링한다.', () => {
    render(<Dialog message={{ type: 'confirm', content: '' }} close={noop} />);

    const confirmButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.confirm,
    });

    const cancelButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.cancel,
    });

    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('confirmLabel이 있으면, 기본 라벨 대신 해당 값을 렌더링한다.', () => {
    const confirmLabel = 'confirm label';

    render(
      <Dialog
        message={{ type: 'confirm', content: '', confirmLabel: confirmLabel }}
        close={noop}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: confirmLabel });

    expect(confirmButton).toBeInTheDocument();
    expect(screen.queryByText(DEFAULT_DIALOG_ACTION_LABEL.confirm)).toBeNull();
  });

  it('cancelLabel이 있으면, 기본 라벨 대신 해당 값을 렌더링한다.', () => {
    const cancelLabel = 'cancel label';

    render(
      <Dialog
        message={{ type: 'confirm', content: '', cancelLabel }}
        close={noop}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: cancelLabel });

    expect(cancelButton).toBeInTheDocument();
    expect(screen.queryByText(DEFAULT_DIALOG_ACTION_LABEL.cancel)).toBeNull();
  });

  it('confirm 버튼을 클릭하면, onConfirm()을 호출하고 다이얼로그를 닫는다.', async () => {
    const onConfirm = jest.fn();
    const close = jest.fn();

    render(
      <Dialog
        message={{ type: 'confirm', content: '', onConfirm }}
        close={close}
      />,
    );

    const confirmButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.confirm,
    });

    await userEvent.click(confirmButton);

    expect(onConfirm).toBeCalled();
    expect(close).toBeCalled();
  });

  it('cancel 버튼을 클릭하면, onCancel()을 호출하고 다이얼로그를 닫는다.', async () => {
    const onCancel = jest.fn();
    const close = jest.fn();

    render(
      <Dialog
        message={{ type: 'confirm', content: '', onCancel }}
        close={close}
      />,
    );

    const cancelButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.cancel,
    });
    await userEvent.click(cancelButton);

    expect(onCancel).toBeCalled();
    expect(close).toBeCalled();
  });

  it('렌더링 후 confirm 버튼에 오토포커스 한다.', () => {
    render(<Dialog message={{ type: 'confirm', content: '' }} close={noop} />);

    const confirmButton = screen.getByRole('button', {
      name: DEFAULT_DIALOG_ACTION_LABEL.confirm,
    });

    expect(confirmButton).toHaveFocus();
  });

  it('alert 타입에서 Escape 키를 누르면, confirm 버튼을 클릭한 것과 동일하게 동작한다.', async () => {
    const onConfirm = jest.fn();
    const close = jest.fn();

    render(
      <Dialog
        message={{ type: 'alert', content: '', onConfirm }}
        close={close}
      />,
    );

    await userEvent.keyboard('{Escape}');

    expect(onConfirm).toBeCalled();
    expect(close).toBeCalled();
  });

  it('confirm 타입에서 Escape 키를 누르면, cancel 버튼을 클릭한 것과 동일하게 동작한다.', async () => {
    const onCancel = jest.fn();
    const close = jest.fn();

    render(
      <Dialog
        message={{ type: 'confirm', content: '', onCancel }}
        close={close}
      />,
    );

    await userEvent.keyboard('{Escape}');

    expect(onCancel).toBeCalled();
    expect(close).toBeCalled();
  });
});
