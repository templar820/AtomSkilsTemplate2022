import MuseumIcon from '@mui/icons-material/Museum';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ChurchIcon from '@mui/icons-material/Church';
import ParkIcon from '@mui/icons-material/Park';
import Colors from '@colors';
import { ReactNode } from 'react';
import MyTag from '@common/MyTag';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import StadiumIcon from '@mui/icons-material/Stadium';
import PetsIcon from '@mui/icons-material/Pets';
import HotelIcon from '@mui/icons-material/Hotel';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PrintIcon from '@mui/icons-material/Print';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PoolIcon from '@mui/icons-material/Pool';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FestivalIcon from '@mui/icons-material/Festival';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlaceIcon from '@mui/icons-material/Place';
import { Category } from '../api/api';
import { Typography } from '@mui/material';

export default class CategoriesFactory {
  getCategory(category: Category): ReactNode {
    let icon = null;

    switch (category.category_group) {
      case 'museum':
        icon = <MuseumIcon fill={Colors.black} />;
        break;
      case 'monument':
        icon = <AttractionsIcon fill={Colors.black} />;
        break;
      case 'catholic church':
      case 'protestant church':
      case 'orthodox church':
      case 'mosque':
        icon = <ChurchIcon fill={Colors.black} />;
        break;
      case 'forest':
      case 'rezervation':
        icon = <ParkIcon fill={Colors.black} />;
        break;
      case 'theatre':
        icon = <TheaterComedyIcon fill={Colors.black} />;
        break;
      case 'attraction':
        icon = <AttractionsIcon fill={Colors.black} />;
        break;
      case 'stadium':
        icon = <StadiumIcon fill={Colors.black} />;
        break;
      case 'zoo':
        icon = <PetsIcon fill={Colors.black} />;
        break;
      case 'hotels':
        icon = <HotelIcon fill={Colors.black} />;
        break;
      case 'park':
        icon = <NaturePeopleIcon fill={Colors.black} />;
        break;
      case 'concert hall':
        icon = <AccountBalanceIcon fill={Colors.black} />;
        break;
      case 'supermarket':
        icon = <ShoppingBasketIcon fill={Colors.black} />;
        break;
      case 'malls':
        icon = <LocalGroceryStoreIcon fill={Colors.black} />;
        break;
      case 'college':
        icon = <SchoolIcon fill={Colors.black} />;
        break;
      case 'fitness':
        icon = <FitnessCenterIcon fill={Colors.black} />;
        break;
      case 'office service':
        icon = <PrintIcon fill={Colors.black} />;
        break;
      case 'sportcenter':
        icon = <SportsBasketballIcon fill={Colors.black} />;
        break;
      case 'cafe':
        icon = <LocalCafeIcon fill={Colors.black} />;
        break;
      case 'waterpark':
        icon = <PoolIcon fill={Colors.black} />;
        break;
      case 'library':
        icon = <MenuBookIcon fill={Colors.black} />;
        break;
      case 'fountain':
        icon = <FestivalIcon fill={Colors.black} />;
        break;
      case 'landmark':
        icon = <PhotoCameraIcon fill={Colors.black} />;
        break;
      default: icon = <PlaceIcon fill={Colors.black} />;
    }

    return <MyTag icon={icon}><Typography variant="button" textAlign={"left"}>{category.name_ru}</Typography></MyTag>;
  }
}

/*
museum,318
monument,151
orthodox church,131
landmark,116
park,82
theatre,57
malls,48
attraction,38
concert hall,29
fallback services,25
college,18
fitness,18
zoo,14
office service,13
sportcenter,11
mosque,11
supermarket,11
hotels,11
government,10
uknown,9
protestant church,9
stadium,9
cafe,8
fallback fun,7
forest,7
waterpark,7
library,6
fountain,6
catholic church,5
swimming pool,5
viewpoint,4
restaurants,4
office,4
rezervation,4
spa,3
industrial enterprise,3
metro,3
beach,3
railway station,3
travel agency,3
skating rink,3
science,2
software,2
railway terminal,2
flower shop,2
confectionary,2
cemetery,2
bus stop,1
synagogue,1
fallback outdoor,1
cableway,1
car park,1
mobile phones,1
picnic,1
playground,1
cinemas,1
memorable event,1
boat station,1
banks,1
hypermarket,1
medicine,1
*
* */
