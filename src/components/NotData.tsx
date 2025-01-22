import { IoMdInformationCircle } from "react-icons/io";
import { motion } from "framer-motion";

const NotData = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50" />
        <IoMdInformationCircle className="w-20 h-20 text-blue-500 relative z-10" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-800 mb-3"
      >
        No Data Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 text-center max-w-md mb-6"
      >
        There's nothing here yet. Data will appear once it's available.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm h-1 bg-gray-100 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
          className="h-full w-1/3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
        />
      </motion.div>
    </motion.div>
  );
};

export default NotData;