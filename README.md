# React Dialog

## 소개

React로 다이얼로그 요소를 구현하였습니다.

- 명령형으로 다이얼로그를 표시하고, 사용자의 선택을 반환받을 수 있습니다.
- 여러 개의 메시지가 동시에 열릴 경우, 순차적으로 표시합니다.
- 상황에 따라 선언적으로 사용할 수도 있습니다.
- 렌더링 시 confirm 버튼에 오토포커스됩니다.
- Escape 키를 이용해 다이얼로그를 닫을 수 있습니다.

## 예시 코드

명령형으로는 다음과 같이 사용할 수 있습니다.

트리 내부에 `GlobalDialog` 컴포넌트가 선언되어 있으면,
어느 컴포넌트에서든 `useDialogStore` 훅으로 다이얼로그를 열 수 있습니다.

```jsx
// App.tsx
import GlobalDialog from '@/components/GlobalDialog';
import Button from '@/components/Button';

const App = () => {
   return (
      //...
      <Button />
      <GlobalDialog />
   )
}

// component/Button.tsx
import { useDialogStore } from '@/store/dialog';

const Button = () => {
  const dialog = useDialogStore();

  const handleClick = async () => {
    const confirmed = await dialog.show({
      type: 'confirm',
      content: '진행하시겠습니까?',
    });

    if (confirmed) {
      doSomething();
    }
  };

  return <button onClick={handleClick}>실행</button>;
};
```

상황에 따라 다음과 같이 선언적으로 사용할 수도 있습니다.

```jsx
import Dialog from '@/components/Dialog';

const App = () => {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <main>
      <button onClick={show}>다이얼로그 열기</button>
      <Dialog
        message={{
          type: 'confirm',
          content: '진행하시겠습니까?',
          confirmLabel: '확인',
          cancelLabel: '취소',
          onConfirm: handleSomething,
        }}
        open={open}
        close={close}
      />
    </main>
  );
};
```
