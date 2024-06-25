import React from 'react';
import { Flex, flexbox } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Card from './Card';
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// Component to contain all Cards
const CardContainer = ({ totalCount, solvedCount, pendingCount }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}
    >
      <Flex gap={10} justifyContent={"space-evenly"} alignItems={"center"} flexWrap={"wrap"} maxWidth={"50%"} >
        <motion.div variants={item}>
          <Card name="total_vs_solved" total={totalCount} solved={solvedCount} />
        </motion.div>
        <motion.div variants={item}>
          <Card name="solved" solved={solvedCount} />
        </motion.div>
        <motion.div variants={item}>
          <Card name="pending" pending={pendingCount} />
        </motion.div>
        <motion.div variants={item}>
          <Card name="pending" pending={pendingCount} />
        </motion.div>
      </Flex>
    </motion.div>
  );
};

export default CardContainer;
