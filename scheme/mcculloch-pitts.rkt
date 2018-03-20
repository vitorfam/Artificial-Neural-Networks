#lang racket

;;McCulloch-Pitts Neuron
;;In this example, we define the
;;connections weights.

;;Activition of neuron Y:
;;f(y_in) = 1, if y_in >= theta
;;          0, if y_in < theta
;;Where theta is the threshold for activation.

(define *theta* 3)
(define *b* 1)
(define *w* '(1 1))
(define x1 '(1 1 0 0))
(define x2 '(1 0 1 0))

(define (y_activation f_net)
  ;;Activation function for Y
  (if (>= f_net *theta*) 1
      0))

(define (fnet xs ws b)
  (+ b (apply + (map (lambda(x w) (* x w)) xs ws))))

;;AND
(define (and-neuron)
  (define w1 1)
  (define w2 1)
  (let loop [(xs1 x1)
             (xs2 x2)
             (res '())]
    (cond [(and (null? xs1) (null? xs2)) (reverse res)]
          [else (loop (cdr xs1)
                      (cdr xs2)
                      (cons (y_activation (fnet (list (car xs1) (car xs2)) (list w1 w2) *b*)) res))])))

;;OR
(define (or-neuron)
  (define w1 2)
  (define w2 3)
  (let loop [(xs1 x1)
             (xs2 x2)
             (res '())]
    (cond [(null? xs1) (reverse res)]
          [else (loop (cdr xs1)
                       (cdr xs2)
                       (cons (y_activation
                              (fnet (list (car xs1)
                                          (car xs2))
                                    (list w1 w2)
                                    *b*))
                             res))])))