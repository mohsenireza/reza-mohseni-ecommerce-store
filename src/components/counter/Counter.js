import { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.scss';
import plus from '../../assets/images/plusSquare.svg';
import minus from '../../assets/images/minusSquare.svg';

class Counter extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleCountIncrease = this.handleCountIncrease.bind(this);
    this.handleCountDecrease = this.handleCountDecrease.bind(this);
  }

  // Increase count
  handleCountIncrease() {
    const { count, max, onCountChange } = this.props;
    if (count < max) onCountChange(count + 1);
  }

  // Decrease count or remove product if count already meets the min value
  handleCountDecrease() {
    const { count, min, onCountChange, onRemove } = this.props;
    if (count > min) onCountChange(count - 1);
    else if (count === min) onRemove();
  }

  render() {
    const { alignment, size, count, max, className } = this.props;

    // Check if count can increased
    const canIncrease = count < max;

    return (
      <div className={`counter -${alignment} -${size} ${className}`}>
        <button
          disabled={!canIncrease}
          onClick={this.handleCountIncrease}
          className={`counter__button ${canIncrease ? '' : '-disabled'}`}
        >
          <img src={plus} />
        </button>
        <span className="counter__count">{count}</span>
        <button onClick={this.handleCountDecrease} className="counter__button">
          <img src={minus} />
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  alignment: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['big', 'small']),
  count: PropTypes.number.isRequired,
  onCountChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
};

Counter.defaultProps = {
  alignment: 'horizontal',
  size: 'big',
  min: 1,
  max: 50,
  className: '',
};

export { Counter };