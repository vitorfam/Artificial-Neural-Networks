(defun to-one (x)
  (if (> x 200) 1 -1))

(defun flatten (l)
  (if l
      (if (atom l) (list l)
	  (mapcan #'flatten l))))

(defun array-to-list (array)
  (let* ((dimensions (array-dimensions array))
         (depth      (1- (length dimensions)))
         (indices    (make-list (1+ depth) :initial-element 0)))
    (labels ((recurse (n)
               (loop for j below (nth n dimensions)
		  do (setf (nth n indices) j)
		  collect (if (= n depth)
			      (apply #'aref array indices)
			      (recurse (1+ n))))))
      (recurse 0))))

(defun img-to-list (img)
  (mapcar #'to-one (flatten (array-to-list (opticl:read-jpeg-file img)))))

(defparameter *b* 0 )
(defparameter *a* 0.09230213122301982308912380912083918092308912380921089 )
(defparameter *o* 0 )
(defparameter *w* '(0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0))
(defparameter *zero* (img-to-list "zero.jpg"))

(defun yl (lst)
  (reduce #'+ (mapcar #'* lst *w*)))
