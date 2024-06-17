import React, { useState, useRef, useEffect } from 'react';
import Loader from "../../components/Loader";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Calendar = () => {
    
    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({title:'', place:'', description:'', user:''});

    moment.locale('es');
  
    const weeks = React.useMemo(() => {
      const start = moment().add(week, 'weeks').startOf('week');
  
      return [-1, 0, 1].map(adj => {
        return Array.from({ length: 7 }).map((_, index) => {
          const date = moment(start).add(adj, 'week').add(index, 'day');
  
          return {
            weekday: date.format('ddd').replace('.', ''),
            date: date.toDate(),
          };
        });
      });
    }, [week]);

    useEffect(() => {
        const fetchDateData = async (selectedDate) => {
            try {
                const response = await fetch(`//${selectedDate}`);
                const data = await response.json();
                setInfo(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // fetchDateData(value.toISOString().split('T')[0]);
        setIsLoading(true);
        setTimeout(() => {
            setInfo({
                title: 'Feria de las pulgas',
                place:'Calle Fantasia 123',
                description:'Evento de ventas de árticulos de variadas categorías.',
                user:'Junta de vecinos sector 1'
            }) 
            setIsLoading(false);
        }, 1000);
    }, [value]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container} className="bg-primary">
            <View style={styles.header}>
              <Text style={styles.title}>Tu calendario</Text>
            </View>
    
            <View style={styles.picker}>
              <Swiper
                index={1}
                ref={swiper}
                loop={false}
                showsPagination={false}
                onIndexChanged={ind => {
                  if (ind === 1) {
                    return;
                  }
                  setTimeout(() => {
                    const newIndex = ind - 1;
                    const newWeek = week + newIndex;
                    setWeek(newWeek);
                    setValue(moment(value).add(newIndex, 'week').toDate());
                    swiper.current.scrollTo(1, false);
                  }, 100);
                }}>
                {weeks.map((dates, index) => (
                  <View style={styles.itemRow} key={index}>
                    {dates.map((item, dateIndex) => {
                      const isActive =
                        value.toDateString() === item.date.toDateString();
                      return (
                        <TouchableWithoutFeedback
                          key={dateIndex}
                          onPress={() => setValue(item.date)}>
                          <View
                            style={[
                              styles.item,
                              isActive && {
                                backgroundColor: '#111',
                                borderColor: '#111',
                              },
                            ]}>
                            <Text
                              style={[
                                styles.itemWeekday,
                                isActive && { color: '#fff' },
                              ]}>
                              {item.weekday}
                            </Text>
                            <Text
                              style={[
                                styles.itemDate,
                                isActive && { color: '#fff' },
                              ]}>
                              {item.date.getDate()}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </View>
                ))}
              </Swiper>
            </View>
    
            <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
              <Text style={styles.subtitle}>{moment(value).format('dddd, D MMMM YYYY')}</Text>
              <View style={styles.placeholder}>
                <View style={styles.placeholderInset} className="p-2">
                  {
                    !isLoading ? (info && <>
                        <Text className="text-2xl font-pbold text-[#FFF]">{info.title}</Text>
                        <Text className="text-[#FFF]">Lugar: {info.place}</Text>
                        <Text className="text-[#FFF]">Organiza: {info.user}</Text>
                        <Text className="mt-8 text-[#FFF]">{info.description}</Text>
                    </> ) : <Loader isLoading={isLoading}/>
                    }
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
    );
}

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8E01',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 65,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF8E01',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFF',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#FF8E01',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#FFF',
  },
});
