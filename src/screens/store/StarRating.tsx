import { View } from 'react-native';
import StarGrayIcon from '@/assets/icons/star-gray.svg';
import StarIcon from '@/assets/icons/star.svg';

const StarRating = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: 'row' }}>
    {Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIcon key={i} width={17} height={17} style={{ marginRight: 1 }} />
      ) : (
        <StarGrayIcon key={i} width={17} height={17} style={{ marginRight: 1 }} />
      )
    )}
  </View>
);

export default StarRating;
