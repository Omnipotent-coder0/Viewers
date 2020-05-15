import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrop } from 'react-dnd';

function ViewportPane({ children, isActive, onDrop }) {
  const [{ isHovered, isHighlighted }, drop] = useDrop({
    accept: 'displayset',
    // TODO: pass in as prop?
    drop: (displaySet, monitor) => {
      const canDrop = monitor.canDrop();
      const isOver = monitor.isOver();

      if (canDrop && isOver && onDrop) {
        const { StudyInstanceUID, displaySetInstanceUID } = displaySet;

        onDrop({
          //viewportIndex, StudyInstanceUID, displaySetInstanceUID
        });
      }
    },
    // Monitor, and collect props; returned as values by `useDrop`
    collect: monitor => ({
      isHighlighted: monitor.canDrop(),
      isHovered: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classnames(
        'rounded-lg hover:border-primary-light transition duration-300 outline-none overflow-hidden',
        {
          'border-2 border-primary-light -m-px': isActive,
          'border border-secondary-light': !isActive,
        }
      )}
    >
      {children}
    </div>
  );
}

ViewportPane.propTypes = {
  /** The ViewportComp */
  children: PropTypes.node.isRequired,
  /** Bool to show active styling */
  isActive: PropTypes.bool.isRequired,
  /** Function that handles drop events */
  onDrop: PropTypes.func.isRequired,
};

export default ViewportPane;