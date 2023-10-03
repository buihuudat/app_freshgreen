import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {styles} from './styles';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import Swiper from 'react-native-swiper';
import {Rating} from 'react-native-ratings';
import {moneyFormat} from '../../utils/handlers/moneyFormat';
import HTML from 'react-native-render-html';
import {ScrollView} from 'react-native';
import {UserImage} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {productActions} from '../../actions/productActions';
import {ProductType} from '../../types/productType';
import {RefreshControl} from 'react-native';
import {RootState} from '../../redux/store';
import CartIcon from '../../components/CartIcon';
import ProductActions from './components/ProductActions';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetails = memo(({route, navigation}: Props) => {
  const {product: ProductParams} = route.params;
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const [product, setProduct] = useState<ProductType>(ProductParams);
  const [refreshing, setRefreshing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productCount, setProductCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    setRefreshing(true);
    await dispatch(productActions.get(product._id!))
      .unwrap()
      .then((data: ProductType) => {
        setProduct(data);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchProduct().then(() => setIsLoading(false));
  }, [ProductParams]);

  const shopImage = product.shop?.user?.avatar
    ? {uri: product.shop?.user.avatar}
    : UserImage;

  const handleAdd = () => {
    if (productCount === 20) {
      setProductCount(productCount);
    } else {
      setProductCount(prev => prev + 1);
    }
  };
  const handleRemove = () => {
    if (productCount <= 1) {
      setProductCount(1);
    } else {
      setProductCount(prev => prev - 1);
    }
  };

  const handleViewShop = () => {
    navigation.push('StoreDetails', {storeId: product.shop?._id!});
  };

  return (
    <View style={styles.container}>
      <Header
        barStyle="dark-content"
        backgroundColor="transparent"
        leftComponent={
          <Icon
            onPress={() => navigation.goBack()}
            color={mainColor}
            name="arrow-back-ios"
          />
        }
        centerComponent={
          <Text style={styles.headerTitle}>{product.category}</Text>
        }
        rightComponent={user ? <CartIcon /> : <></>}
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                tintColor={mainColor}
                refreshing={refreshing}
                onRefresh={fetchProduct}
              />
            }>
            <View style={styles.wrapSwiper}>
              <Swiper
                autoplayTimeout={5}
                showsButtons={false}
                loop
                autoplay
                activeDotColor={mainColor}
                showsPagination={true}>
                {product.images.map((image, index) => (
                  <View key={index} style={styles.wrapImage}>
                    <Image style={styles.image} source={{uri: image}} />
                  </View>
                ))}
              </Swiper>
            </View>

            <View style={styles.content}>
              <Text style={styles.productTitle}>{product.title}</Text>

              <View style={styles.productStar}>
                <View style={styles.viewStar}>
                  <Text style={styles.priceDiscount}>
                    {product.discount > 0 ? moneyFormat(product.price) : ''}
                  </Text>
                  <Text style={styles.discount}>
                    {product.discount > 0 ? '-' + product.discount + '%' : ''}
                  </Text>
                </View>
                <View style={styles.viewStar}>
                  <Rating
                    readonly
                    imageSize={20}
                    startingValue={product.averageStarRating}
                  />
                  {product.comments.length > 0 && (
                    <Text style={styles.textStar}>
                      ({product.comments.length})
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.viewPriceCount}>
                <Text style={styles.price}>
                  {moneyFormat(product.lastPrice)}
                </Text>

                <View style={styles.upDown}>
                  <TouchableOpacity onPress={handleRemove}>
                    <Icon name="remove-circle-outline" color={mainColor} />
                  </TouchableOpacity>
                  <Text style={styles.upDownText}>{productCount}</Text>
                  <TouchableOpacity onPress={handleAdd}>
                    <Icon name="add-circle" color={mainColor} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.productShop}>
                <View style={styles.shop}>
                  <Image style={styles.shopImage} source={shopImage} />
                  <Text style={styles.shopName}>{product.shop?.name}</Text>
                </View>
                <TouchableOpacity onPress={handleViewShop}>
                  <Text style={styles.viewShopText}>Xem shop</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewDesc}>
                <Text style={styles.viewDescTitle}>Thông tin sản phẩm</Text>
                <View style={styles.productTag}>
                  {product.tags.map(tag => (
                    <Text key={tag._id} style={styles.tag}>
                      # {tag.name}
                    </Text>
                  ))}
                </View>
                <HTML
                  contentWidth={width}
                  source={{
                    html: showFullDescription
                      ? product.description
                      : `${product.description.slice(0, 200)}...`,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}>
                  <Text style={{color: mainColor}}>
                    {!showFullDescription ? 'Xem thêm' : 'Ẩn bớt'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <ProductActions
            product={product}
            productCount={productCount}
            user={user!}
          />
        </View>
      )}
    </View>
  );
});

export default ProductDetails;
