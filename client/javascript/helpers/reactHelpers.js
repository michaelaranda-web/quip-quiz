export function setStateOnInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  
  this.setState({
    [name]: value
  });
}