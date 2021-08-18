import PropTypes from 'prop-types';
import {
  producerList, producerItem, producerLogo, producerName,
} from '../../../styles/Movie.module.css';
import { imagesURL } from '../../../API';

const Producers = (props) => {
  const { list } = props;

  const mapProducers = (list) => {
    const filteredList = list.filter((producer) => producer.logo_path);

    return filteredList.map((producer) => (
      <p key={producer.name} className={producerItem}>
        <img className={producerLogo} alt="Producer Logo" src={imagesURL + producer.logo_path} />
        <span className={producerName}>{producer.name}</span>
      </p>
    ));
  };

  return (
    <div className={producerList}>
      {mapProducers(list)}
    </div>
  );
};

Producers.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Producers;
