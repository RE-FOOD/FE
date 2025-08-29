import React, { useState } from 'react';
import { Button, Alert, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  PaymentWidgetProvider,
  usePaymentWidget,
  PaymentMethodWidget,
  AgreementWidget,
} from '@tosspayments/widget-sdk-react-native';
import { confirmPayments } from '@/api/order';

function CheckoutPage({ sessionId, totalAmount }: { sessionId: string; totalAmount: number }) {
  const paymentWidgetControl = usePaymentWidget();
  const [ready, setReady] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <PaymentMethodWidget
        selector="payment-methods"
        onLoadEnd={() => {
          paymentWidgetControl.renderPaymentMethods(
            'payment-methods',
            { value: totalAmount },
            { variantKey: 'DEFAULT' }
          );
        }}
      />

      <AgreementWidget
        selector="agreement"
        onLoadEnd={() => {
          paymentWidgetControl.renderAgreement('agreement', { variantKey: 'DEFAULT' });
          setReady(true);
        }}
      />

      <Button
        title="결제하기"
        onPress={async () => {
          if (!ready) {
            Alert.alert('약관이 준비되지 않았습니다.');
            return;
          }
          const result = await paymentWidgetControl.requestPayment?.({
            orderId: sessionId,
            orderName: '테스트 주문',
          });

          if (result?.success) {
            try {
              await confirmPayments({
                orderId: result.success.orderId,
                paymentKey: result.success.paymentKey,
                amount: result.success.amount,
              });
              Toast.show({
                type: 'success',
                text1: '결제 성공',
                text2: `주문번호: ${result.success.orderId}`,
              });
            } catch {
              Toast.show({
                type: 'error',
                text1: '승인 실패',
                text2: '서버 승인 API 호출 중 오류',
              });
            }
          } else if (result?.fail) {
            Toast.show({
              type: 'error',
              text1: '결제 실패',
              text2: result.fail.message,
            });
          }
        }}
      />
    </ScrollView>
  );
}

export default function TossPaymentScreen({
  route,
}: {
  route: { params: { sessionId: string; totalAmount: number } };
}) {
  const { sessionId, totalAmount } = route.params;

  return (
    <PaymentWidgetProvider
      clientKey="test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
      customerKey={`user-${Date.now()}`} // 무작위 UUID 권장
    >
      <CheckoutPage sessionId={sessionId} totalAmount={totalAmount} />
    </PaymentWidgetProvider>
  );
}
