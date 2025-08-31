import React, { useState } from 'react';
import { Button, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  PaymentWidgetProvider,
  usePaymentWidget,
  PaymentMethodWidget,
  AgreementWidget,
} from '@tosspayments/widget-sdk-react-native';
import { userNavigations } from '@/constants/navigations';
import useOrder from '@/hooks/queries/useOrder';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList, typeof userNavigations.TOSS_PAYMENT>;

function CheckoutPage({ sessionId, totalAmount }: { sessionId: string; totalAmount: number }) {
  const navigation = useNavigation<Nav>();
  const paymentWidgetControl = usePaymentWidget();
  const { confirmPaymentMutation } = useOrder();
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
            return;
          }
          const result = await paymentWidgetControl.requestPayment?.({
            orderId: sessionId,
            orderName: '테스트 주문',
          });

          if (result?.success) {
            confirmPaymentMutation.mutate(
              {
                orderId: result.success.orderId,
                paymentKey: result.success.paymentKey,
                amount: result.success.amount,
              },
              {
                onSuccess: (data) => {
                  navigation.navigate(userNavigations.ORDER_SUCCESS, {
                    level: data?.data.level,
                    levelCheck: data?.data.levelCheck,
                  });
                },
              }
            );
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
      customerKey={`user-${Date.now()}`}
    >
      <CheckoutPage sessionId={sessionId} totalAmount={totalAmount} />
    </PaymentWidgetProvider>
  );
}
