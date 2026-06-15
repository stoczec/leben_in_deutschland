import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, notification } from 'antd';

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    if (!needRefresh) return;
    const key = 'pwa-reload';
    notification.info({
      key,
      message: 'Neue Version verfügbar',
      description: 'Lade neu, um die aktuelle Version zu nutzen.',
      duration: 0,
      btn: (
        <Button type="primary" size="small" onClick={() => updateServiceWorker(true)}>
          Neu laden
        </Button>
      ),
      onClose: () => setNeedRefresh(false),
    });
  }, [needRefresh, setNeedRefresh, updateServiceWorker]);

  return null;
}
