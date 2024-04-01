# MiniERP - An Enterprise Resource Planning System

## Home Page:

### NavBar and SideBar
<img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/DashBoard.png?raw=true">






## 2. Program Description:

### Class Definition (`KNearestNeighbors`):

#### Attributes:
- `n_neighbors`: Number of neighbors to consider when predicting target class values.
- `weights`: Type of weight function used in predictions ('uniform' or 'distance').
- `_X`: Input data matrix used for fitting and predicting.
- `_y`: True class values corresponding to the input data.
- `_distance`: Distance metric function based on the chosen metric ('l1' or 'l2').

#### Methods:
- `__init__`: Initializes the `KNearestNeighbors` object with specified parameters.
- `fit(X, y)`: Fits the model to the provided data matrix `X` and targets `y`.
- `predict(X)`: Predicts class target values for the given test data matrix `X` using the fitted classifier model.

#### Initialization (`__init__` method):
- Validates provided arguments for `n_neighbors`, `weights`, and `metric`.
- Sets up attributes such as `n_neighbors`, `weights`, and `_distance` based on input arguments.

#### Fitting (`fit` method):
- Takes input data `X` and true class values `y`.
- Stores these values in the corresponding attributes `_X` and `_y`.

#### Prediction (`predict` method):
- Calculates distances between each test sample in `X` and all training samples in `_X`.
- Selects the top `n_neighbors` nearest neighbors.
- Uses the majority class among the neighbors to predict the class for the test sample.
- Returns a list of predicted class labels.

## 3. Discussion:

### Implementation Details:
- The code utilizes Euclidean or Manhattan distance functions from the `utils` module to calculate distances.
- For each test sample, it finds the nearest neighbors and predicts the class based on majority voting.

### Challenges and Assumptions:
- The code assumes valid input parameters and raises a `ValueError` for invalid combinations.
- It assumes that the input data is a numpy array with appropriate shapes.

### Design Decisions:
- The class is designed to handle both classification and regression tasks, with a focus on classification.
- The choice of distance metric and weight function can be configured during object creation.

# Question 2
1. Problem Formulation:

The code implements a Multilayer Perceptron (MLP) classifier, a type of artificial neural network, for classification tasks. The model is designed to be able to handle multiple hidden layers, but in this implementation, we only have a single hidden layer. The key components include the initialization of the model, the training process using gradient descent, and making predictions.

2. Implementation Overview:

2.1 Model Architecture:
The model has a specified number of hidden neurons, a hidden layer activation function (e.g., sigmoid), and parameters like the number of iterations and learning rate.
It uses softmax activation for the output layer and cross-entropy loss for optimization.

2.2 Initialization:
The _initialize method performs one-hot encoding for target class values and initializes the neural network weights and biases.

2.3 Forward Pass:
The _forward_pass method computes the forward pass through the neural network, applying activation functions to hidden and output layers.

2.4 Backward Pass:
The _backward_pass method computes the backward pass, calculating gradients and updating weights and biases using gradient descent.

2.5 Training:
The fit method initializes the model, performs forward and backward passes iteratively, and stores the cross-entropy loss every 20 iterations.

2.6 Prediction:
The predict method uses the trained model to make predictions on new data.


3. Design Decisions and Assumptions:
* The model uses a single hidden layer with a specified activation function.
* Weights and biases are initialized randomly.
* Gradient clipping is applied to prevent exploding gradients during backpropagation.
* The code utilizes some utility functions (identity, sigmoid, tanh, relu, softmax, cross_entropy, one_hot_encoding) from the utils module.
