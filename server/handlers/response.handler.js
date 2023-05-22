const error = (res) => res.status(500).json({ message: "Something wrong!!"})

const badRequest = (res, message) =>res.status(400).json(message)

const ok = (res, data) => res.status(200).json(data);

const created = (res, data) => res.status(200).json(data)

const unauthorize = (res) => res.status(401).json({ message: "Unauthorized!!"})

const notFound = (res) => res.status(404).json({ message: "Page not found!!"})
  

export default {
  error,
  badRequest,
  ok,
  created,
  unauthorize,
  notFound,
};
