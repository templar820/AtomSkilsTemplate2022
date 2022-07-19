import React from 'react';
import '../../assets/fonts/Montserrat-Regular.ttf'
import { Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import montserrat from '../../assets/fonts/Montserrat-Regular.ttf';
import montserratBold from '../../assets/fonts/Montserrat-Bold.ttf';
Font.register({ family: 'Montserrat', format: "truetype", src: montserratBold, fontWeight: 'bold' });
Font.register({ family: 'Montserrat', format: "truetype", src: montserrat, fontWeight: 'normal' });

const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 10,
    fontFamily: "Montserrat",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  tableTitle: {
    fontWeight: 'bold',
    paddingRight: 3,
  },
  tableCell: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    width: '50%',
    borderStyle: "solid",
    borderRightWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
  },
  tableSpecCell1: {
    textAlign: 'center',
    width: 170,
  },
  tableSpecCell2: {
    textAlign: 'center',
    width: 50,
  },
  tableSpecCell3: {
    textAlign: 'center',
    width: 50,
  },
  tableSpecCell4: {
    textAlign: 'center',
    width: 70,
  },
  tableSpecCell5: {
    flexGrow: 1,
    width: 'auto'
  },
  tableSpecTitle: {
    backgroundColor: '#eee'
  },
  spec: {
    textAlign: 'center',
    borderRight: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  descriptions: {
    borderRight: 1,
    height: 100,
    padding: 6,
  },
  tableCostCell1: {
    width: 200,
  },
  tableCostCell2: {
    flexGrow: 1,
    width: 'auto'
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>ЗАЯВКА НА ПЕРЕВОЗКУ ГРУЗА № 222 от 01.01.2021</Text>
      </View>
      <View style={[styles.table]}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}><Text>ЗАКАЗЧИК</Text></View>
          <View style={[styles.tableCell]}><Text>ПОЛУЧАТЕЛЬ</Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Наименование:</Text>
            <Text>ФГУП "СКЦ Росатома"</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Наименование:</Text>
            <Text>АО "НИКИЭТ"</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Адрес точки отправления:</Text>
            <Text>Мячковский бул., 11, Москва, 109451"</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Адрес точки отправления:</Text>
            <Text>ул. Складочная, 1, стр. 5, Москва, 127018</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>ИНН:</Text>
            <Text>74524543234</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Ответственный:</Text>
            <Text>Ротенберг Самуил Исхакович</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Ответственный:</Text>
            <Text>Петров Иван Сидорович</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Телефон:</Text>
            <Text>+79196578245</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Телефон:</Text>
            <Text>+79515874287</Text>
          </View>
          <View style={[styles.tableCell]}>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>E-mail:</Text>
            <Text>petrov@mail.ru</Text>
          </View>
          <View style={[styles.tableCell]}>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Дата отправления:</Text>
            <Text>01.01.2021,</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.tableTitle]}>Дата прибытия:</Text>
            <Text>01.01.2021</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.spec]}>
          <Text>СПЕЦИФИКАЦИЯ ЗАЯВКИ</Text>
        </View>
        <View style={[styles.tableRow]}>
          <View style={[styles.tableCell, styles.tableSpecCell1, styles.tableSpecTitle]}>
            <Text style={[styles.tableTitle]}>Наименование</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell2, styles.tableSpecTitle]}>
            <Text style={[styles.tableTitle]}>Кол-во</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell3, styles.tableSpecTitle]}>
            <Text style={[styles.tableTitle]}>Вес, кг</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell4, styles.tableSpecTitle]}>
            <Text style={[styles.tableTitle]}>Объем, м3</Text>
          </View>

          Nick Chikovani, [13.08.21 23:32]
          <View style={[styles.tableCell, styles.tableSpecCell5, styles.tableSpecTitle]}>
            <Text style={[styles.tableTitle]}>Особые требования</Text>
          </View>
        </View>
        <View style={[styles.tableRow]}>
          <View style={[styles.tableCell, styles.tableSpecCell1]}>
            <Text>Оборудование и запчасти</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell2]}>
            <Text>25</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell3]}>
            <Text>5000</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell4]}>
            <Text>16</Text>
          </View>
          <View style={[styles.tableCell, styles.tableSpecCell5]}>
            <Text>нет</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.descriptions]}>
          <Text style={[styles.tableTitle]}>Описане:</Text>
          <Text></Text>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableSpecTitle, styles.tableCostCell1]}>
            <Text style={[styles.tableTitle]}>Стоимость перевозки</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCostCell2]}>
            <Text>28 000 Р</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
